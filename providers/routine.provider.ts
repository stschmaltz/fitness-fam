import { ExerciseObject } from '../types/exercise';
import { RoutineObject } from '../types/routine';

// TODO: is it wrong to leave these as functions? Feels sort of like serverless functions
async function saveRoutine(routine: RoutineObject): Promise<RoutineObject> {
  console.log(routine);

  return routine;
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
        order: routine.exercises.length + 1,
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
    exercises: routine.exercises.filter(
      (exercise) => exercise.id !== exerciseId
    ),
  };

  return newRoutine;
}

export {
  saveRoutine,
  renameRoutine,
  addExerciseToRoutine,
  removeExerciseFromRoutine,
};
