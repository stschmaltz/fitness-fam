import exercises from '../data/exercises/exercises.json';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    me: User!
    exercises: [Exercise!]!
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
    exercise(_: never, { id }) {
      return exercises.find((exercise) => exercise.id === id);
    },
  },
};

export { queryResolver, queryTypeDefs };
