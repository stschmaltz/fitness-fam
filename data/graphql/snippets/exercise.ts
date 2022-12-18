const fullExercise =
  'id, targetMuscle, gifUrl, equipment, bodyPart, name, instructions { number, description }';

const allExercisesQuery = `{ exercises { ${fullExercise} } }`;

const queryExerciseById = (exerciseId: string): string =>
  `{ exercise(id:"${exerciseId}"){ ${fullExercise} } }`;

const exercisesByEquipmentQuery = (equipment: string): string =>
  `{ exercisesByEquipment(equipment: "${equipment}") { ${fullExercise} } }`;

export {
  fullExercise,
  allExercisesQuery,
  queryExerciseById,
  exercisesByEquipmentQuery,
};
