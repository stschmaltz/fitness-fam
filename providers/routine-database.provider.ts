import { ObjectId } from 'bson';
import { RoutineExerciseObject, RoutineObject } from '../types/routine';

import { getDbClient } from '../data/database/mongodb';

const collectionName = 'routines';

type RoutineDocument = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: {
    id: string;
    name: string;
    order: number;
  }[];
};

// TODO: Sort out if leaving ids as ObjectIds is a good idea
// Pros: No mapping, no need for orm, faster for dev
// Cons: ObjectIds are slightly weird and now I'm committing to mongo shapes
const mapRoutineDocumentToRoutineObject = (
  doc: RoutineDocument
): RoutineObject => ({
  _id: doc._id,
  userId: doc.userId,
  name: doc.name,
  order: doc.order,
  exercises: doc.exercises.map(
    (exercise): RoutineExerciseObject => ({
      id: exercise.id,
      name: exercise.name,
      order: exercise.order,
    })
  ),
});

async function getRoutinesForUser(userId: string): Promise<RoutineObject[]> {
  const { db } = await getDbClient();

  const routineDocuments: RoutineDocument[] = (await db
    .collection(collectionName)
    .find({ userId: new ObjectId(userId) })
    .toArray()) as RoutineDocument[];

  return routineDocuments.map(mapRoutineDocumentToRoutineObject);
}

async function saveRoutine(routine: RoutineObject): Promise<RoutineObject> {
  try {
    const { db } = await getDbClient();

    await db.collection(collectionName).insertOne({
      ...routine,
      _id: new ObjectId(routine._id),
      userId: new ObjectId(routine.userId),
    });

    return routine;
  } catch (error) {
    console.log(error);
    return routine;
  }
}

async function deleteRoutine(routineId: string): Promise<void> {
  try {
    const { db } = await getDbClient();
    console.log('deleting,', routineId);
    await db
      .collection(collectionName)
      .deleteOne({ _id: new ObjectId(routineId) });

    return;
  } catch (error) {
    console.log(error);

    throw error;
  }
}
export {
  saveRoutine,
  getRoutinesForUser,
  deleteRoutine,
  mapRoutineDocumentToRoutineObject,
};
