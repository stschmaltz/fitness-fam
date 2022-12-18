import { injectable } from 'inversify';
import { RoutineProviderInterface } from './routine.provider.interface';
import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';

@injectable()
class RoutineProvider implements RoutineProviderInterface {
  public saveNewOrder(
    exercises: RoutineExerciseObject[]
  ): RoutineExerciseObject[] {
    const exercisesWithOrder = exercises.map((exercise, index) => ({
      ...exercise,
      order: index,
    }));

    return exercisesWithOrder;
  }

  public renameRoutine(routine: RoutineObject, newName: string): RoutineObject {
    const newRoutine = { ...routine, name: newName };

    return newRoutine;
  }

  public addExerciseToRoutine(
    routine: RoutineObject,
    newExercise: ExerciseObject
  ): RoutineObject {
    const newRoutine: RoutineObject = {
      ...routine,
      exercises: [
        ...routine.exercises,
        {
          id: newExercise.id,
          name: newExercise.name,
          order: routine.exercises.length,
        },
      ],
    };

    return newRoutine;
  }

  public removeExerciseFromRoutine(
    routine: RoutineObject,
    exerciseId: string
  ): RoutineObject {
    const newRoutine: RoutineObject = {
      ...routine,
      exercises: this.saveNewOrder(
        routine.exercises.filter((exercise) => exercise.id !== exerciseId)
      ),
    };

    return newRoutine;
  }
}
export { RoutineProvider };
