import { injectable } from 'inversify';

import { ExerciseProviderInterface } from './exercise.provider.interface';
import { EQUIPMENT, ExerciseObject } from '../../types/exercise';

@injectable()
class ExerciseProvider implements ExerciseProviderInterface {
  constructor(private allExercises: ExerciseObject[]) {}
  async getAllExercises(): Promise<ExerciseObject[]> {
    return this.allExercises;
  }

  async getExercisesByEquipment(
    equipment: EQUIPMENT
  ): Promise<ExerciseObject[]> {
    const exercises = await this.getAllExercises();

    return exercises
      .filter((exercise) => {
        return exercise.equipment === equipment;
      })
      .map((exercise) => ({
        ...exercise,
        equipment: EQUIPMENT[exercise.equipment],
      }));
  }

  async findExerciseById(id: string): Promise<ExerciseObject> {
    const exercises = await this.getAllExercises();

    const exercise = exercises.find((exercise) => exercise.id === id);
    // if no exercise throw error else return
    if (!exercise) {
      throw new Error('Exercise not found with id: ' + id + '.');
    }

    return {
      ...exercise,
      equipment: EQUIPMENT[exercise.equipment],
    };
  }
}

export { ExerciseProvider };
