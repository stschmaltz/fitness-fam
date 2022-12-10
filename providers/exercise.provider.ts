import { EQUIPMENT, ExerciseObject } from '../types/exercise';
import exercises from '../data/exercises/exercises.json';

// TODO: what do front-ends normally do for these things
async function getAllExercises(): Promise<ExerciseObject[]> {
  return exercises.map((exercise) => ({
    ...exercise,
    equipment: EQUIPMENT[exercise.equipment],
  }));
}

async function getExercisesByEquipment(
  equipment: EQUIPMENT
): Promise<ExerciseObject[]> {
  const exercises = await getAllExercises();

  return exercises
    .filter((exercise) => {
      return exercise.equipment === equipment;
    })
    .map((exercise) => ({
      ...exercise,
      equipment: EQUIPMENT[exercise.equipment],
    }));
}

async function findExerciseById(id: string): Promise<ExerciseObject> {
  const exercises = await getAllExercises();

  return exercises.find((exercise) => exercise.id === id);
}

export { getAllExercises, getExercisesByEquipment, findExerciseById };
