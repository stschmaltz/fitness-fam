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
    equipment: EQUIPMENT,
  ): Promise<ExerciseObject[]> {
    const exercises = await this.getAllExercises();

    return exercises.filter((exercise) => {
      return exercise.equipment === equipment;
    });
  }

  async findExerciseById(id: string): Promise<ExerciseObject | undefined> {
    const exercises = await this.getAllExercises();

    const exercise = exercises.find((exercise) => exercise.id === id);

    if (!exercise) {
      // throw new Error('Exercise not found with id: ' + id + '.');
      return;
    }

    return exercise;
  }

  async getExercises(ids: string[]): Promise<ExerciseObject[]> {
    const allExercises = await this.getAllExercises();

    const exercises = allExercises.filter((exercise) =>
      ids.includes(exercise.id),
    );

    return exercises;
  }
}

export { ExerciseProvider };
