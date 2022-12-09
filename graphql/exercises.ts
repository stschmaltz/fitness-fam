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

const fullExercise =
  'id, target, gifUrl, equipment, bodyPart, name, instructions { number, description }';

const allExercisesQuery = `{ exercises { ${fullExercise} } }`;

export { exerciseTypeDefs, allExercisesQuery, fullExercise };
