import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
import Layout from '../components/layout';
import { ExerciseObject } from '../types/exercise';
import { RoutineObject } from '../types/routine';
import {
  addExerciseToRoutine,
  removeExerciseFromRoutine,
} from '../providers/routine.provider';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import { saveRoutineMutationGraphQL } from '../data/graphql/snippets/mutation';
import CurrentRoutineList from '../components/CurrentRoutineList';
import NoExercisesRoutineList from '../components/NoExercisesRoutineList';
import ExerciseSearchList from '../components/ExerciseSearchList';
import { getAllExercises } from '../providers/exercise.provider';
import { reorderList } from '../providers/list-helpers.provider';

export default function NewRoutinePage() {
  const router = useRouter();

  // TODO: is fetching larger data better in useEffect or getStaticProps?
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  const successToast = useToast();

  useEffect(() => {
    const fetchExercises = async () => {
      const allExercises = await getAllExercises();
      setExercises(allExercises);
    };
    fetchExercises();
  }, []);

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    _id: new ObjectId(),
    userId: new ObjectId('1'),
    name: 'New Routine ' + '1',
    exercises: [],
    order: -1,
  });

  const handleSaveRoutine = async (routine) => {
    if (!routine.name || !routine.exercises.length) return;
    try {
      await asyncFetch(saveRoutineMutationGraphQL, { input: { routine } });
    } catch (error) {
      console.log('Error saving routine', { errorMessage: error.message });
      //TODO: add error and success toast
    }
    successToast({
      title: 'Routine Saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    router.push('/');
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newRoutine = {
      ...currentRoutine,
      exercises: reorderList(
        currentRoutine.exercises,
        result.source.index,
        result.destination.index
      ).map((exercise: ExerciseObject, index) => ({
        ...exercise,
        order: index,
      })),
    };

    setCurrentRoutine(newRoutine);
  };

  const handleRoutineNameChange = (event) => {
    setCurrentRoutine({ ...currentRoutine, name: event.target.value });
  };

  const handleExerciseOnClick = (exercise: ExerciseObject) => {
    // Add new exercise to current routine and remove from search results
    const newRoutine: RoutineObject = addExerciseToRoutine(
      currentRoutine,
      exercise
    );
    setCurrentRoutine(newRoutine);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    const newRoutine: RoutineObject = removeExerciseFromRoutine(
      currentRoutine,
      exerciseId
    );
    setCurrentRoutine(newRoutine);
  };

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
            colorScheme="brand"
            onClick={async () => await handleSaveRoutine(currentRoutine)}
          >
            Save
          </Button>
        </Flex>
        {currentRoutine?.exercises.length > 0 ? (
          <Box maxHeight="35vh" minHeight="35vh" overflowY="auto" pr={1}>
            <CurrentRoutineList
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
        maxHeight={'35vh'}
        minHeight={'35vh'}
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

// export async function getStaticProps() {
//   const exercises = await getAllExercises();
//   return {
//     props: { exercises },
//   };
// }
