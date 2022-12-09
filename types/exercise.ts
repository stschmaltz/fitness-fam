export interface Instruction {
  number: number;
  description: string;
}

export interface ExerciseObject {
  id: string;
  name: string;
  instructions: Instruction[];
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  target: string;
}
