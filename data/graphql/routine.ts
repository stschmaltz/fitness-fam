import sortBy from 'lodash/sortBy';
import { getRoutinesForUser } from '../../providers/routine-database.provider';

const routineTypeDefs = /* GraphQL */ `
  input RoutineExerciseInput {
    order: Int!
    id: String!
    name: String!
  }

  input RoutineInput {
    id: String
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExerciseInput!]!
  }

  input SaveRoutineInput {
    routine: RoutineInput!
  }

  type SaveRoutineResponse {
    routine: Routine!
  }

  type RoutineExercise {
    order: Int!
    id: String!
    name: String!
  }

  type Routine {
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExercise!]!
  }
`;
const routineResolver = {
  User: {
    async routines() {
      const routines = await getRoutinesForUser();

      return sortBy(routines, 'order');
    },
  },
};

export { routineTypeDefs, routineResolver };
