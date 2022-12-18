import { EQUIPMENT, ExerciseObject } from '../../types/exercise';

export interface ExerciseProviderInterface {
  getAllExercises(): Promise<ExerciseObject[]>;
  getExercisesByEquipment(equipment: EQUIPMENT): Promise<ExerciseObject[]>;
  findExerciseById(id: string): Promise<ExerciseObject | undefined>;
}
