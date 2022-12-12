const exerciseTypeDefs = /* GraphQL */ `
  enum EQUIPMENT {
    ASSISTED
    BAND
    BARBELL
    BODY_WEIGHT
    BOSU_BALL
    CABLE
    DUMBBELL
    ELLIPTICAL_MACHINE
    EZ_BARBELL
    KETTLEBELL
    MEDICINE_BALL
    OLYMPIC_BARBELL
    RESISTANCE_BAND
    FOAM_ROLLER
    ROPE
    LEG_PRESS_MACHINE
    SMITH_MACHINE
    YOGA_BALL
    STATIONARY_BIKE
    STAIR_MASTER
    TIRE
    TRAP_BAR
    GYM_MACHINE
    WEIGHTED
    WHEEL_ROLLER
  }

  type Instruction {
    number: Int!
    description: String!
  }
  type Exercise {
    bodyPart: String!
    equipment: EQUIPMENT!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
    instructions: [Instruction!]!
  }
`;

export { exerciseTypeDefs };
