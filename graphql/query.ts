const queryTypeDefs = /* GraphQL */ `
  type Query {
    users: [User!]!
  }
`;

const queryResolver = {
  Query: {
    users() {
      return [{ name: "Shane Schmaltz" }];
    },
  },
};

export { queryResolver, queryTypeDefs };
