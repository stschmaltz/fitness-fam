export interface RoutineExerciseObject {
  order: number;
  name: string;
  id: string;
}
export interface RoutineObject {
  name: string;
  order: number;
  exercises: RoutineExerciseObject[];
}
