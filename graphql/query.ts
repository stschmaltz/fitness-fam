import data from '../data/exercises/exercises.json';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    exercises: [Exercise!]!
    exercise(id: String!): Exercise!
  }
`;

const queryResolver = {
  Query: {
    users() {
      return [{ name: 'Shane Schmaltz' }];
    },
    exercises() {
      return data.map((exercise) => ({ instructions: [], ...exercise }));
    },
    exercise(_: {}, { id }) {
      return data.find((exercise) => exercise.id === id);
    },
  },
};

export { queryResolver, queryTypeDefs };
