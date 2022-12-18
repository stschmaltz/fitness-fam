import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';

export interface RoutineProviderInterface {
  saveNewOrder(exercises: RoutineExerciseObject[]): RoutineExerciseObject[];
  renameRoutine(routine: RoutineObject, newName: string): RoutineObject;
  addExerciseToRoutine(
    routine: RoutineObject,
    newExercise: ExerciseObject
  ): RoutineObject;
  removeExerciseFromRoutine(
    routine: RoutineObject,
    exerciseId: string
  ): RoutineObject;
}
