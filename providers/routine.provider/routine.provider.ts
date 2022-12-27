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

  public addExerciseToRoutine(input: {
    routine: RoutineObject;
    newExercise: ExerciseObject;
    sets?: number;
    reps?: number;
  }): RoutineObject {
    const { routine, newExercise, sets, reps } = input;
    const newRoutine: RoutineObject = {
      ...routine,
      exercises: [
        ...routine.exercises,
        {
          id: newExercise.id,
          name: newExercise.name,
          order: routine.exercises.length,
          exercise: newExercise,
          reps,
          sets,
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

  public updateExerciseInRoutine(input: {
    routine: RoutineObject;
    updatedExercise: RoutineExerciseObject;
  }): RoutineObject {
    const { routine, updatedExercise } = input;
    const newRoutine: RoutineObject = {
      ...routine,
      exercises: this.saveNewOrder(
        routine.exercises.map((exercise) =>
          exercise.id === updatedExercise.id
            ? {
                ...updatedExercise,
              }
            : exercise
        )
      ),
    };

    return newRoutine;
  }
}
export { RoutineProvider };
