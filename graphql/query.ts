import {
  findExerciseById,
  getAllExercises,
  getExercisesByEquipment,
} from '../providers/exercise.provider';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    me: User!
    exercises: [Exercise!]!
    exercisesByEquipment(equipment: String!): [Exercise!]!
    exercise(id: String!): Exercise!
  }
`;

const queryResolver = {
  Query: {
    async me() {
      return { name: 'Shane Schmaltz' };
    },

    async exercises() {
      return getAllExercises();
    },

    async exercisesByEquipment(_: never, { equipment }) {
      return getExercisesByEquipment(equipment);
    },

    async exercise(_: never, { id }) {
      return findExerciseById(id);
    },
  },
};

export { queryResolver, queryTypeDefs };
