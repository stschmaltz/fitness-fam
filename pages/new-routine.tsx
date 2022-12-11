import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { ExerciseObject } from '../types/exercise';
import { RoutineObject } from '../types/routine';
import {
  addExerciseToRoutine,
  removeExerciseFromRoutine,
} from '../providers/routine.provider';
import { asyncFetch } from '../graphql/graphql-fetcher';
import { saveRoutineMutationGraphQL } from '../graphql/snippets/mutation';
import CurrentRoutineList from '../components/CurrentRoutineList';
import NoExercisesRoutineList from '../components/NoExercisesRoutineList';
import ExerciseSearchList from '../components/ExerciseSearchList';

export default function Exercises() {
  const router = useRouter();

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    id: '1',
    userId: '1',
    name: 'New Routine ' + '1',
    exercises: [
      { id: '1001', name: 'Squats', order: 0 },
      { id: '2001', name: 'Bench Press', order: 1 },
      { id: '3001', name: 'Dead Lift', order: 2 },
      { id: '4001', name: 'Shoulder Press', order: 3 },
    ],
    order: -1,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleSaveRoutine = async (routine) => {
    //TODO: add error and success toast
    if (!routine.name || !routine.exercises.length) return;
    await asyncFetch(saveRoutineMutationGraphQL, { input: { routine } });
    router.push('/');
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newRoutine = {
      ...currentRoutine,
      exercises: reorder(
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
        <Flex>
          <Input
            variant="outline"
            placeholder="New Routine"
            value={currentRoutine.name}
            onChange={handleRoutineNameChange}
            mb={10}
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
          <CurrentRoutineList
            handleOnDragEnd={onDragEnd}
            currentRoutine={currentRoutine}
            handleRemoveExerciseFromRoutine={handleRemoveExerciseFromRoutine}
          />
        ) : (
          <NoExercisesRoutineList />
        )}
      </Box>
      <Box m={100} />
      <Box>
        <Text fontSize="4xl">Exercises</Text>
        <ExerciseSearchList handleExerciseOnClick={handleExerciseOnClick} />
      </Box>
    </Layout>
  );
}
