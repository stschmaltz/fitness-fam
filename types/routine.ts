import { ObjectId } from 'bson';

export interface RoutineExerciseObject {
  order: number;
  name: string;
  id: string;
}
export interface RoutineObject {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: RoutineExerciseObject[];
}
