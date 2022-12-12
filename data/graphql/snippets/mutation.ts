import { fullRoutine } from './routine';
import { ApiUser, fullUser } from './user';

const saveRoutineMutationGraphQL = `mutation saveRoutine($input: SaveRoutineInput!){
  saveRoutine(input:$input){
    routine ${fullRoutine}
  }
}`;
const signInUserMutationQraphQL = `mutation userSignIn($input: UserSignInInput!) {
  userSignIn(input: $input) {
    user ${fullUser}
  }
}`;

export interface SignInUserMutationReponse {
  userSignIn: {
    user: ApiUser;
  };
}

export { saveRoutineMutationGraphQL, signInUserMutationQraphQL };
