import { Alert, Box, Button, Flex, Input, Link, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ObjectId } from 'bson';
import { useRouter } from 'next/router';

import Layout from '../components/layout';
import { ExerciseObject } from '../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../types/routine';
import CurrentRoutineList from '../components/CurrentRoutineList';
import NoExercisesRoutineList from '../components/NoExercisesRoutineList';
import ExerciseSearchList from '../components/ExerciseSearchList';
import { reorderList } from '../lib/list-helpers';
import { localStorageProvider } from '../providers/local-storage.provider';
import { theme } from '../styles/theme';
import { appContainer } from '../container/inversify.config';
import { TYPES } from '../container/types';
import { RoutineProviderInterface } from '../providers/routine.provider/routine.provider.interface';
import BasicLoader from '../components/BasicLoader';
import { useUserSignIn } from '../hooks/use-user-sign-in.hook';
import { useGetAllExercises } from '../hooks/use-get-all-exercises.hook';
import { useHandleSaveRoutine } from '../hooks/use-handle-save-routine.hook';

export default function NewRoutinePage() {
  const router = useRouter();
  const currentRoutineLocalStorageKey = 'currentRoutine';

  const [isLoading, currentUser] = useUserSignIn();

  /** Routines */
  const handleSaveRoutineHookFunction = useHandleSaveRoutine();
  const handleSaveRoutine = (routine: RoutineObject) => {
    handleSaveRoutineHookFunction(routine);
    localStorageProvider.removeItem(currentRoutineLocalStorageKey);
    router.push('/');
  };

  const routineProvider = appContainer.get<RoutineProviderInterface>(
    TYPES.RoutineProvider
  );

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    _id: new ObjectId(),
    userId: currentUser?._id ? new ObjectId(currentUser._id) : new ObjectId(),
    name: '',
    exercises: [],
    order: -1,
  });

  useEffect(() => {
    const routineFromLocalStorage = localStorageProvider.getItem<RoutineObject>(
      currentRoutineLocalStorageKey
    );
    if (routineFromLocalStorage) {
      setCurrentRoutine({
        ...routineFromLocalStorage,
        userId: currentUser?._id
          ? new ObjectId(currentUser._id)
          : routineFromLocalStorage.userId,
      });
    }
  }, [currentUser?._id]);

  useEffect(() => {
    localStorageProvider.setItem<RoutineObject>(
      currentRoutineLocalStorageKey,
      currentRoutine
    );
  }, [currentRoutine]);

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

  if (isLoading)
    return (
      <Box h="80vh">
        <BasicLoader />
      </Box>
    );

  return (
    <Layout home={false}>
      {!currentUser && (
        <Alert status="info" colorScheme="accent1" mb={3}>
          <InfoIcon color={theme.colors.accent1['900']} />
          <Text color={theme.colors.accent1['900']} ml={2} fontSize="md">
            Login to save your routine.
          </Text>
        </Alert>
      )}
      <Box pos="fixed" color={theme.colors.brandLight}></Box>
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
          {currentUser ? (
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
          ) : (
            <Button ml="3" colorScheme="brandPrimary" size="lg">
              <Link href="/api/auth/login?returnTo=/new-routine">Login</Link>
            </Button>
          )}
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
