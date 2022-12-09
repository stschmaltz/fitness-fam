import routines from '../data/routines.json';
import sortBy from 'lodash/sortBy';

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
    routines() {
      return sortBy(routines, 'order');
    },
  },
};

export { routineTypeDefs, routineResolver };
