import { RoutineExerciseObject, RoutineObject } from '../types/routine';

import { getDbClient } from '../data/database/mongodb';

async function getRoutinesForUser(): Promise<RoutineObject[]> {
  const { db } = await getDbClient();

  const routineDocuments = await db
    .collection('routines')
    .find({ userId: '1' })
    .toArray();

  return routineDocuments.map(mapRoutineDocumentToRoutineObject);
}

// TODO: Sort out if leaving ids as ObjectIds is a good idea
// Pros: No mapping, no need for orm, faster for dev
// Cons: ObjectIds are slightly weird and now I'm committing to mongo shapes
const mapRoutineDocumentToRoutineObject = (doc): RoutineObject => ({
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

async function saveRoutine(routine: RoutineObject): Promise<RoutineObject> {
  try {
    const { db } = await getDbClient();

    await db.collection('routines').insertOne(routine);

    return routine;
  } catch (error) {
    console.log(error);
    return routine;
  }
}
export { saveRoutine, getRoutinesForUser, mapRoutineDocumentToRoutineObject };
