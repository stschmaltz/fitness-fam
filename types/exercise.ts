export interface Instruction {
  number: number;
  description: string;
}

export enum TARGET_MUSCLE {
  ABDUCTORS = 'Abductors',
  ABS = 'Abs',
  ADDUCTORS = 'Adductors',
  BICEPS = 'Biceps',
  CALVES = 'Calves',
  CARDIO = 'Cardio',
  DELTS = 'Delts',
  FOREARMS = 'Forearms',
  GLUTES = 'Glutes',
  HAMSTRINGS = 'Hamstrings',
  LATS = 'Lats',
  NECK = 'Neck',
  PECTORALS = 'Pectorals',
  QUADS = 'Quads',
  SERRATUS_ANTERIOR = 'Serratus Anterior',
  SPINE = 'Spine',
  TRAPS = 'Traps',
  TRICEPS = 'Triceps',
  UPPER_BACK = 'Upper Back',
}

export enum EQUIPMENT {
  ASSISTED = 'Assisted',
  BAND = 'Band',
  BARBELL = 'Barbell',
  BODY_WEIGHT = 'Bodyweight',
  BOSU_BALL = 'Bosu Ball',
  CABLE = 'Cable',
  DUMBBELL = 'Dumbbell',
  ELLIPTICAL_MACHINE = 'Elliptical Machine',
  EZ_BARBELL = 'EZ Barbell',
  KETTLEBELL = 'Kettlebell',
  MEDICINE_BALL = 'Medicine Ball',
  OLYMPIC_BARBELL = 'Olympic Barbell',
  RESISTANCE_BAND = 'Resistance Band',
  FOAM_ROLLER = 'Foam Roller',
  ROPE = 'Rope',
  LEG_PRESS_MACHINE = 'Leg Press Machine',
  SMITH_MACHINE = 'Smith Machine',
  YOGA_BALL = 'Yoga Ball',
  STATIONARY_BIKE = 'Stationary Bike',
  STAIR_MASTER = 'Stair Master',
  TIRE = 'Tire',
  TRAP_BAR = 'Trap Bar',
  GYM_MACHINE = 'Gym Machine',
  WEIGHTED = 'Weighted',
  WHEEL_ROLLER = 'Wheel Roller',
}
export interface ExerciseObject {
  id: string;
  name: string;
  instructions: Instruction[];
  bodyPart: string;
  equipment: EQUIPMENT;
  gifUrl: string;
  targetMuscle: TARGET_MUSCLE;
}
