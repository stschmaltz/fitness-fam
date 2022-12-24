const exerciseTypeDefs = /* GraphQL */ `
  type Instruction {
    number: Int!
    description: String!
  }

  type Exercise {
    bodyArea: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    targetMuscle: String!
    instructions: [Instruction!]!
  }
`;

export { exerciseTypeDefs };
