import { useToast } from '@chakra-ui/react';
import { DropResult } from 'react-beautiful-dnd';
import { appContainer } from '../container/inversify.config';
import { TYPES } from '../container/types';
import { RoutineObject } from '../types/routine';
import { RoutineProviderInterface } from '../providers/routine.provider/routine.provider.interface';

function useHandleCreateSupersetDuringCombine(input: {
  currentRoutine: RoutineObject;
  setCurrentRoutine: (routine: RoutineObject) => void;
}): {
  handleCombine: (result: DropResult) => void;
  handleSplit: (parentExerciseId: string) => void;
} {
  const routineProvider = appContainer.get<RoutineProviderInterface>(
    TYPES.RoutineProvider
  );
  const { currentRoutine, setCurrentRoutine } = input;
  const toast = useToast();

  const handleCombine = (result: DropResult) => {
    if (!result.combine) return;

    const supersetExercise = currentRoutine.exercises.find(
      (exercise) => exercise.id === result.draggableId
    );
    const destinationExercise = currentRoutine.exercises.find(
      (exercise) => exercise.id === result.combine?.draggableId
    );
    if (
      !supersetExercise ||
      supersetExercise.supersetExerciseId ||
      destinationExercise?.supersetExerciseId
    ) {
      toast({
        title: 'Exercises can only have one superset exercise.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    const newRoutine = routineProvider.createSuperset({
      routine: currentRoutine,
      destinationExerciseId: result.combine?.draggableId,
      supersetExercise: supersetExercise.exercise,
      supersetReps: supersetExercise.reps,
    });
    setCurrentRoutine(newRoutine);
  };

  const handleSplit = (parentExerciseId: string) => {
    const newRoutine = routineProvider.splitSuperset({
      routine: currentRoutine,
      parentExerciseId,
    });
    setCurrentRoutine(newRoutine);
  };

  return { handleCombine, handleSplit } as const;
}
F
export { useHandleCreateSupersetDuringCombine };
