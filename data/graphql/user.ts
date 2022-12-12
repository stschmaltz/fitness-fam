const userTypeDefs = /* GraphQL */ `
  type User {
    _id: String!
    email: String!
    routines: [Routine!]!
  }

  type UserSignInResponse {
    user: User!
  }

  input UserSignInInput {
    email: String!
  }
`;

export { userTypeDefs };
