import { fullRoutine } from './routine';

const saveRoutineMutationGraphQL = `mutation saveRoutine($input: SaveRoutineInput!){
  saveRoutine(input:$input){
    routine ${fullRoutine}
  }
}`;

export { saveRoutineMutationGraphQL };
