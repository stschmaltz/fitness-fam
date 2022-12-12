import { saveRoutine } from '../../providers/routine-database.provider';
import { handleUserSignIn } from '../../providers/user.provider';
import { RoutineObject } from '../../types/routine';
import { UserObject } from '../../types/user';

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
  input: { email: string };
}

const mutationResolver = {
  Mutation: {
    async saveRoutine(
      _: never,
      args: SaveRoutineArgs
    ): Promise<{ routine: RoutineObject }> {
      const {
        input: { routine },
      } = args;

      await saveRoutine(routine);

      return { routine };
    },

    async userSignIn(
      _: never,
      args: UserSignInInput
    ): Promise<{ user: UserObject }> {
      try {
        const {
          input: { email },
        } = args;
        const user = await handleUserSignIn(email);

        return { user };
      } catch (error) {
        console.log(error);
        throw new Error('User not found');
      }
    },
  },
};

export { mutationResolver, mutationTypeDefs };
