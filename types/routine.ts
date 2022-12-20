import { ObjectId } from 'bson';

export interface RoutineExerciseObject {
  order: number;
  name: string;
  id: string;
  sets?: number;
  reps?: number;
}
export interface RoutineObject {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: RoutineExerciseObject[];
}
