const userTypeDefs = /* GraphQL */ `
  type User {
    email: String!
    routines: [Routine!]!
  }

  type UserSignInResponse {
    user: User!
  }

  input UserSignInInput {
    email: String!
    passwordHash: String!
  }
`;

export { userTypeDefs };
