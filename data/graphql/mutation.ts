import { saveRoutine } from '../../providers/routine-database.provider';
import { verifyUserSignIn } from '../../providers/user.provider';
import { RoutineObject } from '../../types/routine';

const mutationTypeDefs = /* GraphQL */ `
  type Mutation {
    userSignIn(input: UserSignInInput!): UserSignInResponse
    saveRoutine(input: SaveRoutineInput!): SaveRoutineResponse!
  }
`;
interface SaveRoutineArgs {
  input: { routine: RoutineObject };
}
export interface UserSignInInput {
  input: { email: string; passwordHash: string };
}

const mutationResolver = {
  Mutation: {
    async saveRoutine(_: never, args: SaveRoutineArgs) {
      const {
        input: { routine },
      } = args;

      await saveRoutine(routine);

      return { routine };
    },

    async userSignIn(_: never, args: UserSignInInput) {
      const {
        input: { email, passwordHash },
      } = args;

      const user = await verifyUserSignIn(email, passwordHash);

      return user;
    },
  },
};

export { mutationResolver, mutationTypeDefs };
