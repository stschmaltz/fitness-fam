import { RoutineObject } from '../types/routine';

// TODO: what do front-ends normally do for these things
async function saveRoutine(routine: RoutineObject): Promise<RoutineObject> {
  console.log(routine);

  return routine;
}
export { saveRoutine };
