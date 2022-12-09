import data from '../data/exercises/exercises.json';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    exercises: [Exercise!]!
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
  },
};

export { queryResolver, queryTypeDefs };
