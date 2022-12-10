export interface RoutineExerciseObject {
  order: number;
  name: string;
  id: string;
}
export interface RoutineObject {
  id: string;
  userId: string;
  name: string;
  order: number;
  exercises: RoutineExerciseObject[];
}
