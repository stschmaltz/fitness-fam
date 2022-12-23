import { Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { DropResult } from 'react-beautiful-dnd';
import { ObjectId } from 'bson';

import Layout from '../../components/layout';
import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';
import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import { saveRoutineMutationGraphQL } from '../../data/graphql/snippets/mutation';
import CurrentRoutineList from '../../components/CurrentRoutineList';
import NoExercisesRoutineList from '../../components/NoExercisesRoutineList';
import ExerciseSearchList from '../../components/ExerciseSearchList';
import { reorderList } from '../../lib/list-helpers';
import { theme } from '../../styles/theme';
import { appContainer } from '../../container/inversify.config';
import { TYPES } from '../../container/types';
import { RoutineProviderInterface } from '../../providers/routine.provider/routine.provider.interface';
import BasicLoader from '../../components/BasicLoader';
import { fullRoutine } from '../../data/graphql/snippets/routine';
import { useUserSignIn } from '../../hooks/use-user-sign-in.hook';
import { useGetAllExercises } from '../../hooks/use-get-all-exercises.hook';

export default function EditRoutinePage(props: { routine?: RoutineObject }) {
  const { routine } = props;

  const router = useRouter();

  const [isLoading, currentUser, _setCurrentUser] = useUserSignIn();

  /** Routines */
  const routineProvider = appContainer.get<RoutineProviderInterface>(
    TYPES.RoutineProvider
  );

  const routineSaveToast = useToast();

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    _id: routine?._id ?? new ObjectId(),
    userId: routine?.userId ?? new ObjectId(),
    name: routine?.name ?? '',
    exercises: routine?.exercises ?? [],
    order: routine?.order ?? 0,
  });

  const handleSaveRoutine = async (routine: RoutineObject) => {
    if (!routine.name || !routine.exercises.length) return;
    try {
      await asyncFetch(saveRoutineMutationGraphQL, { input: { routine } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      console.error(errorMessage);

      routineSaveToast({
        title:
          'Something went wrong saving routine. Send me a message with what happened. fitnessfam.app@gmail.com',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    routineSaveToast({
      title: 'Routine Saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    router.push('/');
  };

  const disableSaveButton =
    !currentRoutine.name || !currentRoutine.exercises.length;

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newRoutine: RoutineObject = {
      ...currentRoutine,
      exercises: reorderList<RoutineExerciseObject>(
        currentRoutine.exercises,
        result.source.index,
        result.destination.index
      ).map((exercise: RoutineExerciseObject, index: number) => ({
        ...exercise,
        order: index,
      })),
    };

    setCurrentRoutine(newRoutine);
  };

  // TODO: type this event correctly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRoutineNameChange = (event: any) => {
    setCurrentRoutine({ ...currentRoutine, name: event.target.value });
  };

  /** Exercises */
  const [exercises] = useGetAllExercises();

  const handleExerciseOnClick = (exercise: ExerciseObject) => {
    // TODO somehow get sets and reps here
    // Add new exercise to current routine and remove from search results
    const newRoutine: RoutineObject = routineProvider.addExerciseToRoutine({
      routine: currentRoutine,
      newExercise: exercise,
      reps: undefined,
      sets: undefined,
    });
    setCurrentRoutine(newRoutine);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    const newRoutine: RoutineObject = routineProvider.removeExerciseFromRoutine(
      currentRoutine,
      exerciseId
    );
    setCurrentRoutine(newRoutine);
  };

  const handleSetsRepsChange = (
    exercise: RoutineExerciseObject,
    value: string,
    type: 'sets' | 'reps'
  ) => {
    const numberValue = parseInt(value);
    if (numberValue < 0 || numberValue > 99) return;

    const updatedExercise = {
      ...exercise,
      [type]: numberValue,
    };
    const newRoutine: RoutineObject = routineProvider.updateExerciseInRoutine({
      routine: currentRoutine,
      updatedExercise,
    });

    setCurrentRoutine(newRoutine);
  };

  const handleRepsChange = (exercise: RoutineExerciseObject, value: string) => {
    handleSetsRepsChange(exercise, value, 'reps');
  };

  const handleSetsChange = (exercise: RoutineExerciseObject, value: string) => {
    handleSetsRepsChange(exercise, value, 'sets');
  };

  if (isLoading) return <BasicLoader />;

  if (!currentUser) {
    return (
      <Layout home={false}>
        <div>401: Not Authorized</div>
      </Layout>
    );
  }

  if (!routine) {
    // TODO: real 404 page
    return (
      <Layout home={false}>
        <div>404: Routine not found</div>
      </Layout>
    );
  }

  return (
    <Layout home={false}>
      <Box>
        <Flex mb={5}>
          <Input
            variant="outline"
            placeholder="New Routine"
            value={currentRoutine.name}
            onChange={handleRoutineNameChange}
            pl={0}
            fontSize="3xl"
          />

          <Button
            ml="4"
            p={5}
            colorScheme="brandSecondary"
            disabled={disableSaveButton}
            onClick={async () => await handleSaveRoutine(currentRoutine)}
          >
            <Text color={theme.colors.white} fontSize="lg">
              Save
            </Text>
          </Button>
        </Flex>
        {currentRoutine?.exercises.length > 0 ? (
          <Box maxHeight="35vh" minHeight="35vh" overflowY="auto" pr={1}>
            <CurrentRoutineList
              handleSetsChange={handleSetsChange}
              handleRepsChange={handleRepsChange}
              handleOnDragEnd={onDragEnd}
              currentRoutine={currentRoutine}
              handleRemoveExerciseFromRoutine={handleRemoveExerciseFromRoutine}
            />
          </Box>
        ) : (
          <Box maxHeight="35vh" minHeight="35vh" overflowY="auto">
            <NoExercisesRoutineList />
          </Box>
        )}
      </Box>
      <Box
        maxHeight={'45vh'}
        minHeight={'235px'}
        pr={1}
        mt={currentRoutine?.exercises.length > 4 ? 5 : 0}
      >
        <ExerciseSearchList
          allExercises={exercises}
          handleExerciseOnClick={handleExerciseOnClick}
        />
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  try {
    const routine = await asyncFetch(
      `{ routine(id:"${query.id}") ${fullRoutine}  }`
    );

    return {
      props: routine,
    };
  } catch (error) {
    console.log('error', error);

    return {
      props: {},
    };
  }
};
