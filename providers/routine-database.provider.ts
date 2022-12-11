import { RoutineExerciseObject, RoutineObject } from '../types/routine';

import { getDbClient } from '../data/lib/mongodb';

// TODO: is it wrong to leave these as functions? Feels sort of like serverless functions
async function getRoutinesForUser(): Promise<RoutineObject[]> {
  const { db } = await getDbClient();

  const routineDocuments = await db
    .collection('routines')
    .find({ userId: '1' })
    .toArray();

  return routineDocuments.map(
    (doc): RoutineObject => ({
      id: doc.id,
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
    })
  );
}

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
export { saveRoutine, getRoutinesForUser };
