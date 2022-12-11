import { Box, Button, Flex, Input } from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { InferGetStaticPropsType } from 'next';
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
import { getAllExercises } from '../providers/exercise.provider';

export default function NewRoutinePage({
  exercises,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    id: '1',
    userId: '1',
    name: 'New Routine ' + '1',
    exercises: [],
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
          <Box maxHeight="35vh" minHeight="35vh" overflow="scroll">
            <CurrentRoutineList
              handleOnDragEnd={onDragEnd}
              currentRoutine={currentRoutine}
              handleRemoveExerciseFromRoutine={handleRemoveExerciseFromRoutine}
            />
          </Box>
        ) : (
          <Box maxHeight="35vh" minHeight="35vh" overflow="scroll">
            <NoExercisesRoutineList />
          </Box>
        )}
      </Box>
      <Box
        maxHeight={'35vh'}
        minHeight={'35vh'}
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
export async function getStaticProps() {
  const exercises = await getAllExercises();
  return {
    props: { exercises },
  };
}
