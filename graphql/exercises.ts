const exerciseTypeDefs = /* GraphQL */ `
  type Instruction {
    number: Int!
    description: String!
  }
  type Exercise {
    bodyPart: String!
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
    instructions: [Instruction!]!
  }
`;

export { exerciseTypeDefs };
