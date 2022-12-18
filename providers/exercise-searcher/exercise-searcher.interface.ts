import { ExerciseObject } from '../../types/exercise';

export interface ExerciseSearcherInterface {
  searchForExercises(input: string): ExerciseObject[];
}
