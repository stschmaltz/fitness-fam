import exercises from '../data/exercises/exercises.json';

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
    me() {
      return { name: 'Shane Schmaltz' };
    },
    exercises() {
      return exercises;
    },
    exercisesByEquipment(_: never, { equipment }) {
      return exercises.filter((exercise) => {
        return exercise.equipment === equipment;
      });
    },
    exercise(_: never, { id }) {
      return exercises.find((exercise) => exercise.id === id);
    },
  },
};

export { queryResolver, queryTypeDefs };
