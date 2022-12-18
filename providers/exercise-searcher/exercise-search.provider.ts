import Fuse from 'fuse.js';
import { injectable } from 'inversify';

import { ExerciseSearcherInterface } from './exercise-searcher.interface';
import { ExerciseObject } from '../../types/exercise';

@injectable()
class ExerciseSearcher implements ExerciseSearcherInterface {
  private fuse: Fuse<ExerciseObject>;

  constructor(private allExercises: ExerciseObject[]) {
    const options = {
      keys: ['id', 'equipment', 'bodyPart', 'name', 'targetMuscle'],
      threshold: 0.3,
      includeScore: true,
    };
    const exercisesIndex = Fuse.createIndex(options.keys, this.allExercises);
    this.fuse = new Fuse(this.allExercises, options, exercisesIndex);
  }

  public searchForExercises(input: string): ExerciseObject[] {
    // TODO: play with score
    const result = this.fuse.search(input);
    console.log('result', { input, result });

    return result.map((exercise) => exercise.item);
  }
}

export { ExerciseSearcher };
