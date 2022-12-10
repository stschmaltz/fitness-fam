import { EQUIPMENT, ExerciseObject } from '../types/exercise';
import exercises from '../data/exercises/exercises.json';

// TODO: what do front-ends normally do for these things
async function getExercises(): Promise<ExerciseObject[]> {
  return exercises.map((exercise) => ({
    ...exercise,
    equipment: EQUIPMENT[exercise.equipment],
  }));
}
export { getExercises };
