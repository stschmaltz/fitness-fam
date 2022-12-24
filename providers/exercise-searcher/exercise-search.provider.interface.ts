import {
  BODY_AREA,
  EQUIPMENT,
  ExerciseObject,
  TARGET_MUSCLE,
} from '../../types/exercise';

enum SearchFilterType {
  TARGET_MUSCLE = 'targetMuscle',
  EQUIPMENT = 'equipment',
}

export interface TargetMuscleSearchFilter {
  type: SearchFilterType.TARGET_MUSCLE;
  values: TARGET_MUSCLE[];
}

export interface EquipmentSearchFilter {
  type: SearchFilterType.EQUIPMENT;
  values: EQUIPMENT[];
}

export type SearchFilters = {
  targetMuscleFilters: TARGET_MUSCLE[];
  equipmentFilters: EQUIPMENT[];
  bodyAreaFilters: BODY_AREA[];
};

export interface ExerciseSearchProviderInterface {
  searchForExercises(
    input: string,
    searchFilters: SearchFilters
  ): ExerciseObject[];
}
