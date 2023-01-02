import { fullExercise } from './exercise';

const fullRoutine = `
    _id  
    order
    name
    userId
    
    exercises {
      order
      id
      exercise { ${fullExercise} }
      supersetExercise { ${fullExercise} }
      name
      sets
      reps
      supersetExerciseId
      supersetReps
    }
  `;

export { fullRoutine };
