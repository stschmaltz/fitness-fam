import data from "../data/exercises/exercises.json";

const queryTypeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
    exercises: [Exercise!]!
  }
`;

const queryResolver = {
  Query: {
    users() {
      return [{ name: "Shane Schmaltz" }];
    },
    exercises() {
      console.log(data);
      return data;
    },
  },
};

export { queryResolver, queryTypeDefs };
