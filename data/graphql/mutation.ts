// import { saveRoutine } from '../providers/routine.provider';
import { saveRoutine } from '../../providers/routine-database.provider';
import { RoutineObject } from '../../types/routine';

const mutationTypeDefs = /* GraphQL */ `
  type Mutation {
    saveRoutine(input: SaveRoutineInput!): SaveRoutineResponse!
  }
`;
interface SaveRoutineArgs {
  input: { routine: RoutineObject };
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
  },
};

export { mutationResolver, mutationTypeDefs };
