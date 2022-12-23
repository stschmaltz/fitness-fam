import Fuse from 'fuse.js';
import { injectable } from 'inversify';

import {
  ExerciseSearchProviderInterface,
  SearchFilters,
} from './exercise-search.provider.interface';
import { ExerciseObject } from '../../types/exercise';

@injectable()
class ExerciseSearcher implements ExerciseSearchProviderInterface {
  private fuse: Fuse<ExerciseObject>;

  constructor(private allExercises: ExerciseObject[]) {
    const options = {
      keys: ['id', 'equipment', 'bodyPart', 'name', 'targetMuscle'],
      threshold: 0.35,
      includeScore: true,
    };
    const exercisesIndex = Fuse.createIndex(options.keys, this.allExercises);
    this.fuse = new Fuse(this.allExercises, options, exercisesIndex);
  }

  public searchForExercises(
    input: string,
    filters: SearchFilters
  ): ExerciseObject[] {
    // if no filters search fuzzy on all fields
    if (
      filters.equipmentFilters.length + filters.targetMuscleFilters.length ===
      0
    ) {
      // TODO: play with score
      const result = this.fuse.search(input);

      return result.map((exercise) => exercise.item);
    }

    // if filters, use text for name and apply filters
    const equipmentFilter = Object.values(filters.equipmentFilters).map(
      (equipment) => ({
        equipment: `'${equipment}`,
      })
    );
    // if filters, use text for name and apply filters
    const targetMuscleFilter = Object.values(filters.targetMuscleFilters).map(
      (targetMuscle) => ({
        targetMuscle: `'${targetMuscle}`,
      })
    );
    const appliedFilters = [
      !!input ? { name: input || ' ' } : null,
      equipmentFilter.length > 0 ? { $or: [...equipmentFilter] } : null,
      targetMuscleFilter.length > 0 ? { $or: [...targetMuscleFilter] } : null,
    ].filter((filter) => filter !== null);

    const searchInput = {
      $and: [...appliedFilters],
    };
    console.log(searchInput);
    if (appliedFilters.length > 0) {
      const result = this.fuse.search(searchInput as string | Fuse.Expression);
      return result.map((exercise) => exercise.item);
    }
  }
}

export { ExerciseSearcher };
