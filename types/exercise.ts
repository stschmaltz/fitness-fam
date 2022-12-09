export interface Instruction {
  number: number;
  description: string;
}

export enum EQUIPMENT {
  ASSISTED = 'ASSISTED',
  BAND = 'BAND',
  BARBELL = 'BARBELL',
  BODY_WEIGHT = 'BODY_WEIGHT',
  BOSU_BALL = 'BOSU_BALL',
  CABLE = 'CABLE',
  DUMBBELL = 'DUMBBELL',
  ELLIPTICAL_MACHINE = 'ELLIPTICAL_MACHINE',
  EZ_BARBELL = 'EZ_BARBELL',
  KETTLEBELL = 'KETTLEBELL',
  MEDICINE_BALL = 'MEDICINE_BALL',
  OLYMPIC_BARBELL = 'OLYMPIC_BARBELL',
  RESISTANCE_BAND = 'RESISTANCE_BAND',
  FOAM_ROLLER = 'FOAM_ROLLER',
  ROPE = 'ROPE',
  LEG_PRESS_MACHINE = 'LEG_PRESS_MACHINE',
  SMITH_MACHINE = 'SMITH_MACHINE',
  YOGA_BALL = 'YOGA_BALL',
  STATIONARY_BIKE = 'STATIONARY_BIKE',
  STAIR_MASTER = 'STAIR_MASTER',
  TIRE = 'TIRE',
  TRAP_BAR = 'TRAP_BAR',
  GYM_MACHINE = 'GYM_MACHINE',
  WEIGHTED = 'WEIGHTED',
  WHEEL_ROLLER = 'WHEEL_ROLLER',
}
export interface ExerciseObject {
  id: string;
  name: string;
  instructions: Instruction[];
  bodyPart: string;
  equipment: EQUIPMENT;
  gifUrl: string;
  target: string;
}
