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
      supersetReps
    }
  `;

export { fullRoutine };
