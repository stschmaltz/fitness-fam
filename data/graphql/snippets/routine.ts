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
      name
      sets
      reps
    }
  `;

export { fullRoutine };
