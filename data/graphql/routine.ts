import sortBy from 'lodash/sortBy';
import { getRoutinesForUser } from '../../providers/routine-database.provider';
import { UserObject } from '../../types/user';

const routineTypeDefs = /* GraphQL */ `
  input RoutineExerciseInput {
    order: Int!
    id: String!
    name: String!
    sets: Int
    reps: Int
  }

  input RoutineInput {
    _id: String
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExerciseInput!]!
  }

  input DeleteRoutineInput {
    routineId: String!
  }

  type DeleteRoutineResponse {
    success: Boolean!
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
    sets: Int
    reps: Int
  }

  type Routine {
    _id: String!
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExercise!]!
  }
`;
const routineResolver = {
  User: {
    async routines(parent: Omit<UserObject, '_id'> & { _id: string }) {
      try {
        const routines = await getRoutinesForUser(parent._id);

        return sortBy(routines, 'order');
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
};

export { routineTypeDefs, routineResolver };
