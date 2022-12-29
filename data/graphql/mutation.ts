import { getSession, updateSession } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteRoutine,
  saveRoutine,
} from '../../providers/routine-database.provider';
import { handleUserSignIn } from '../../providers/user.provider';
import { RoutineObject } from '../../types/routine';
import { UserObject } from '../../types/user';

const mutationTypeDefs = /* GraphQL */ `
  type Mutation {
    userSignIn(input: UserSignInInput!): UserSignInResponse
    saveRoutine(input: SaveRoutineInput!): SaveRoutineResponse!
    deleteRoutine(input: DeleteRoutineInput!): DeleteRoutineResponse!
  }
`;
interface SaveRoutineArgs {
  input: { routine: RoutineObject };
}

interface DeleteRoutineArgs {
  input: { routineId: string };
}
export interface UserSignInInput {
  input: { email: string };
}

const mutationResolver = {
  Mutation: {
    async saveRoutine(
      _: never,
      args: SaveRoutineArgs,
      ctx: { req: NextApiRequest; res: NextApiResponse }
    ): Promise<{ routine: RoutineObject }> {
      const auth0User = await getSession(ctx.req, ctx.res);

      if (!auth0User?.user || !auth0User.user.id) {
        throw new Error('User is not authenticated to make this request');
      }

      const {
        input: { routine },
      } = args;

      await saveRoutine(routine, auth0User.user.id);

      return { routine };
    },

    async deleteRoutine(
      _: never,
      args: DeleteRoutineArgs,
      ctx: { req: NextApiRequest; res: NextApiResponse }
    ): Promise<{ success: boolean }> {
      const auth0User = await getSession(ctx.req, ctx.res);

      if (!auth0User?.user || !auth0User.user.id) {
        throw new Error('User is not authenticated to make this request');
      }

      const {
        input: { routineId },
      } = args;

      await deleteRoutine(routineId, auth0User.user.id);

      return { success: true };
    },

    async userSignIn(
      _: never,
      args: UserSignInInput,
      ctx: { req: NextApiRequest; res: NextApiResponse }
    ): Promise<{ user: UserObject }> {
      try {
        const userSession = await getSession(ctx.req, ctx.res);

        if (!userSession?.user || userSession.user.email !== args.input.email) {
          throw new Error('User is not authenticated to make this request');
        }

        const {
          input: { email },
        } = args;
        const userSignedIn = await handleUserSignIn(email);

        await updateSession(ctx.req, ctx.res, {
          ...userSession,
          user: { ...userSession.user, id: userSignedIn._id },
        });

        return { user: userSignedIn };
      } catch (error) {
        console.log(error);
        throw new Error('User not found');
      }
    },
  },
};

export { mutationResolver, mutationTypeDefs };
