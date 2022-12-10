import { ExerciseObject } from '../types/exercise';
import { RoutineExerciseObject, RoutineObject } from '../types/routine';

function saveNewOrder(
  exercises: RoutineExerciseObject[]
): RoutineExerciseObject[] {
  const exercisesWithOrder = exercises.map((exercise, index) => ({
    ...exercise,
    order: index,
  }));

  return exercisesWithOrder;
}

function renameRoutine(routine: RoutineObject, newName: string): RoutineObject {
  const newRoutine = { ...routine, name: newName };

  return newRoutine;
}

function addExerciseToRoutine(
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

function removeExerciseFromRoutine(
  routine: RoutineObject,
  exerciseId: string
): RoutineObject {
  const newRoutine: RoutineObject = {
    ...routine,
    exercises: saveNewOrder(
      routine.exercises.filter((exercise) => exercise.id !== exerciseId)
    ),
  };

  return newRoutine;
}

export { renameRoutine, addExerciseToRoutine, removeExerciseFromRoutine };
