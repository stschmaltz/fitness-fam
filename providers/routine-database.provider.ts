import { ObjectId } from 'bson';
import { RoutineExerciseObject, RoutineObject } from '../types/routine';

import { getDbClient } from '../data/database/mongodb';

const collectionName = 'routines';

enum RoutineStatus {
  ACTIVE = 'Active',
  DELETED = 'Deleted',
}

type RoutineDocument = {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  order: number;
  exercises: {
    id: string;
    name: string;
    order: number;
    reps?: number;
    sets?: number;
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
      reps: exercise.reps,
      sets: exercise.sets,
    })
  ),
});

async function getRoutinesForUser(userId: string): Promise<RoutineObject[]> {
  const { db } = await getDbClient();

  const routineDocuments: RoutineDocument[] = (await db
    .collection(collectionName)
    .find({ userId: new ObjectId(userId), status: RoutineStatus.ACTIVE })
    .toArray()) as RoutineDocument[];

  return routineDocuments.map(mapRoutineDocumentToRoutineObject);
}

async function saveRoutine(routine: RoutineObject): Promise<RoutineObject> {
  try {
    const { db } = await getDbClient();

    await db.collection(collectionName).findOneAndUpdate(
      { _id: new ObjectId(routine._id) },
      {
        $set: {
          ...routine,
          _id: new ObjectId(routine._id),
          userId: new ObjectId(routine.userId),
          status: RoutineStatus.ACTIVE,
        },
      },
      { upsert: true }
    );

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
      .findOneAndUpdate(
        { _id: new ObjectId(routineId) },
        { $set: { status: RoutineStatus.DELETED } }
      );

    return;
  } catch (error) {
    console.log(error);

    throw error;
  }
}

async function findRoutineById(id: string): Promise<RoutineObject | undefined> {
  try {
    const { db } = await getDbClient();
    const routineDocument: RoutineDocument | null = (await db
      .collection(collectionName)
      .findOne({ _id: new ObjectId(id) })) as RoutineDocument | null;

    if (!routineDocument) {
      // throw new Error('Routine not found with id: ' + id + '.');
      return;
    }

    return mapRoutineDocumentToRoutineObject(routineDocument);
  } catch (error) {
    console.log(error);

    throw error;
  }
}

export {
  saveRoutine,
  getRoutinesForUser,
  deleteRoutine,
  findRoutineById,
  mapRoutineDocumentToRoutineObject,
};
