import { titleCase } from 'title-case';
import {
  BODY_AREA,
  EQUIPMENT,
  ExerciseObject,
  TARGET_MUSCLE,
} from '../types/exercise';

const bodyPartToBodyAreaMap: { [key: string]: BODY_AREA } = {
  'lower arms': BODY_AREA.ARMS,
  'upper arms': BODY_AREA.ARMS,
  back: BODY_AREA.BACK,
  cardio: BODY_AREA.CARDIO,
  chest: BODY_AREA.CHEST,
  waist: BODY_AREA.CORE,
  'upper legs': BODY_AREA.LEGS,
  'lower legs': BODY_AREA.LEGS,
  neck: BODY_AREA.NECK,
  shoulders: BODY_AREA.SHOULDERS,
};

export const mapBodyPartToBodyArea = (bodyPart: string): BODY_AREA => {
  return bodyPartToBodyAreaMap[bodyPart] || BODY_AREA.CORE; // TODO: better default
};

interface ExerciseFileObject {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}
[];

export const mapExercises = (exercises: ExerciseFileObject[]) => {
  const mappedExercises: ExerciseObject[] = exercises.map((exercise) => ({
    id: exercise.id,
    name: titleCase(exercise.name),
    instructions: exercise.instructions.map((instruction, index) => ({
      number: index + 1,
      description: instruction,
    })),
    gifUrl: exercise.gifUrl,
    bodyArea: mapBodyPartToBodyArea(exercise.bodyPart),
    equipment: titleCase(exercise.equipment) as EQUIPMENT, // TODO: actually map this
    targetMuscle: titleCase(exercise.target) as TARGET_MUSCLE, // TODO: actually map this
  }));

  return mappedExercises;
};
