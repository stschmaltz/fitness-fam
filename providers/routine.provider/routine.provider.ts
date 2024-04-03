import { injectable } from 'inversify';
import { RoutineProviderInterface } from './routine.provider.interface';
import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';

@injectable()
class RoutineProvider implements RoutineProviderInterface {
  splitSuperset(input: {
    routine: RoutineObject;
    parentExerciseId: string;
  }): RoutineObject {
    const { routine, parentExerciseId } = input;

    const parentExercise = routine.exercises.find(
      (exercise) => exercise.id === parentExerciseId,
    );

    if (!parentExercise?.supersetExerciseId || !parentExercise.supersetExercise)
      return routine;

    const splitExercise: RoutineExerciseObject = {
      id: parentExercise.supersetExerciseId,
      exercise: parentExercise.supersetExercise,
      name: parentExercise.supersetExercise.name,
      order: parentExercise.order + 1,
      reps: parentExercise.supersetReps,
      sets: parentExercise.sets,
      supersetExerciseId: undefined,
      supersetExercise: undefined,
      supersetReps: undefined,
    };

    const exerciseListWithoutSuperset = routine.exercises.map((exercise) => {
      if (exercise.id === parentExerciseId) {
        return {
          ...exercise,
          supersetExerciseId: undefined,
          supersetExercise: undefined,
          supersetReps: undefined,
        };
      }

      return exercise;
    });
    const updatedExerciseList = [
      ...exerciseListWithoutSuperset.slice(0, splitExercise.order),
      splitExercise,
      ...exerciseListWithoutSuperset.slice(splitExercise.order),
    ];

    const newRoutine: RoutineObject = {
      ...routine,
      exercises: this.saveNewOrder(updatedExerciseList),
    };

    return newRoutine;
  }

  public createSuperset(input: {
    routine: RoutineObject;
    destinationExerciseId: string;
    supersetExercise: ExerciseObject;
    supersetReps: number;
  }): RoutineObject {
    const { routine, destinationExerciseId, supersetExercise, supersetReps } =
      input;

    const updatedExerciseList = routine.exercises
      .map((exercise) => {
        if (exercise.id === destinationExerciseId) {
          return {
            ...exercise,
            supersetExerciseId: supersetExercise.id,
            supersetExercise,
            supersetReps,
          };
        }
        return exercise;
      })
      .filter((exercise) => exercise.id !== supersetExercise.id);

    const newRoutine: RoutineObject = {
      ...routine,
      exercises: this.saveNewOrder(updatedExerciseList),
    };

    return newRoutine;
  }

  public saveNewOrder(
    exercises: RoutineExerciseObject[],
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
          supersetExerciseId: undefined,
          supersetExercise: undefined,
          supersetReps: undefined,
        },
      ],
    };

    return newRoutine;
  }

  public removeExerciseFromRoutine(
    routine: RoutineObject,
    exerciseId: string,
  ): RoutineObject {
    const newRoutine: RoutineObject = {
      ...routine,
      exercises: this.saveNewOrder(
        routine.exercises.filter((exercise) => exercise.id !== exerciseId),
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
            : exercise,
        ),
      ),
    };

    return newRoutine;
  }
}
export { RoutineProvider };
