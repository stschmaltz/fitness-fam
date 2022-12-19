import { EQUIPMENT, ExerciseObject, targetMuscle } from '../../types/exercise';

enum SearchFilterType {
  targetMuscle = 'targetMuscle',
  EQUIPMENT = 'equipment',
}

export interface TargetMuscleSearchFilter {
  type: SearchFilterType.targetMuscle;
  values: targetMuscle[];
}

export interface EquipmentSearchFilter {
  type: SearchFilterType.EQUIPMENT;
  values: EQUIPMENT[];
}

export type SearchFilters = {
  targetMuscleFilters: targetMuscle[];
  equipmentFilters: EQUIPMENT[];
};

export interface ExerciseSearchProviderInterface {
  searchForExercises(
    input: string,
    searchFilters: SearchFilters
  ): ExerciseObject[];
}
