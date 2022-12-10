import sortBy from 'lodash/sortBy';
import { getRoutinesForUser } from '../providers/routine.provider';

const routineTypeDefs = /* GraphQL */ `
  type RoutineExercise {
    order: Int!
    id: String!
    name: String!
  }

  type Routine {
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
