import Fuse from 'fuse.js';
import { ExerciseObject } from '../types/exercise';
import exercises from '../data/exercises/exercises.json';

class ExerciseSearcher {
  private fuse: Fuse<ExerciseObject>;
  private allExercises: ExerciseObject[];

  constructor() {
    this.allExercises = exercises as ExerciseObject[];

    const options = {
      keys: ['id', 'equipment', 'bodyPart', 'equipment', 'name', 'target'],
    };
    const exercisesIndex = Fuse.createIndex(options.keys, this.allExercises);
    this.fuse = new Fuse(
      this.allExercises,
      {
        keys: options.keys,
        threshold: 0.4,
      },
      exercisesIndex
    );
  }

  searchForExercises(input: string): ExerciseObject[] {
    // TODO: play with score
    const result = this.fuse.search(input);
    console.log('result', { input, result });

    return result.map((exercise) => exercise.item);
  }
}

export { ExerciseSearcher };
