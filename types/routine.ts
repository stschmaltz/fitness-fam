import { ObjectId } from 'bson';
import { ExerciseObject } from './exercise';

export interface DBRoutineExerciseObject {
  order: number;
  name: string;
  id: string;
  sets?: number;
  reps?: number;
  supersetExerciseId?: string;
  supersetReps?: number;
}
export interface DBRoutineObject {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: DBRoutineExerciseObject[];
}

export interface RoutineExerciseObject {
  order: number;
  name: string;
  id: string;
  exercise: ExerciseObject;
  sets?: number;
  reps?: number;
  supersetExerciseId?: string;
  supersetExercise?: ExerciseObject;
  supersetReps?: number;
}
export interface RoutineObject {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: RoutineExerciseObject[];
}
