import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';

export interface RoutineProviderInterface {
  saveNewOrder(exercises: RoutineExerciseObject[]): RoutineExerciseObject[];
  renameRoutine(routine: RoutineObject, newName: string): RoutineObject;
  addExerciseToRoutine(input: {
    routine: RoutineObject;
    newExercise: ExerciseObject;
    sets?: number;
    reps?: number;
  }): RoutineObject;
  updateExerciseInRoutine(input: {
    routine: RoutineObject;
    updatedExercise: RoutineExerciseObject;
  }): RoutineObject;
  removeExerciseFromRoutine(
    routine: RoutineObject,
    exerciseId: string,
  ): RoutineObject;
  createSuperset(input: {
    routine: RoutineObject;
    destinationExerciseId: string;
    supersetExercise: ExerciseObject;
    supersetReps?: number;
  }): RoutineObject;
  splitSuperset(input: {
    routine: RoutineObject;
    parentExerciseId: string;
  }): RoutineObject;
}
