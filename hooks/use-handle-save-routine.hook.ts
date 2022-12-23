import { useToast } from '@chakra-ui/react';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import { saveRoutineMutationGraphQL } from '../data/graphql/snippets/mutation';
import { RoutineObject } from '../types/routine';

function useHandleSaveRoutine(): (routine: RoutineObject) => Promise<void> {
  const routineSaveToast = useToast();

  const handleSaveRoutine = async (routine: RoutineObject) => {
    if (!routine.name || !routine.exercises.length) return;
    try {
      await asyncFetch(saveRoutineMutationGraphQL, { input: { routine } });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;

      console.log('Error saving routine', { errorMessage });
      routineSaveToast({
        title: 'Something went wrong saving routine.',
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
  };

  return handleSaveRoutine;
}

export { useHandleSaveRoutine };
