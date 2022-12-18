import { RoutineExerciseObject } from '../../types/routine';

export interface RoutineProvider {
  saveNewOrder(exercises: RoutineExerciseObject[]): RoutineExerciseObject[];
}
