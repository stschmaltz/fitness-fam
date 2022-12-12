import { fullRoutine } from './routine';

const saveRoutineMutationGraphQL = `mutation saveRoutine($input: SaveRoutineInput!){
  saveRoutine(input:$input){
    routine ${fullRoutine}
  }
}`;
const signInUserMutationQraphQL = `mutation userSignIn($input: UserSignInInput!) {
  userSignIn(input: $input) {
    user {
      email
    }
  }
}`;

export { saveRoutineMutationGraphQL, signInUserMutationQraphQL };
