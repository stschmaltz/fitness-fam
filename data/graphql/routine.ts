import sortBy from 'lodash/sortBy';
import { appContainer } from '../../container/inversify.config';
import { TYPES } from '../../container/types';
import { ExerciseProviderInterface } from '../../providers/exercise.provider/exercise.provider.interface';
import { getRoutinesForUser } from '../../providers/routine-database.provider';
import { RoutineExerciseObject } from '../../types/routine';
import { UserObject } from '../../types/user';

const routineTypeDefs = /* GraphQL */ `
  input RoutineExerciseInput {
    order: Int!
    id: String!
    name: String!
    sets: Int
    reps: Int
    supersetReps: Int
    supersetExerciseId: String
  }

  input RoutineInput {
    _id: String
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExerciseInput!]!
  }

  input DeleteRoutineInput {
    routineId: String!
  }

  type DeleteRoutineResponse {
    success: Boolean!
  }

  input SaveRoutineInput {
    routine: RoutineInput!
  }

  type SaveRoutineResponse {
    routine: Routine!
  }

  type RoutineExercise {
    order: Int!
    id: String!
    exercise: Exercise!
    name: String!
    sets: Int
    reps: Int
    supersetReps: Int
    supersetExerciseId: String
    supersetExercise: Exercise
  }

  type Routine {
    _id: String!
    userId: String!
    order: Int!
    name: String!
    exercises: [RoutineExercise!]!
  }
`;
const routineResolver = {
  User: {
    async routines(parent: Omit<UserObject, '_id'> & { _id: string }) {
      try {
        const routines = await getRoutinesForUser(parent._id);

        return sortBy(routines, 'order');
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  },
  RoutineExercise: {
    async exercise(
      parent: Omit<RoutineExerciseObject, 'exercise' | 'supersetExercise'>
    ) {
      const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
        TYPES.ExerciseProvider
      );

      return exerciseProvider.findExerciseById(parent.id);
    },
    async supersetExercise(
      parent: Omit<RoutineExerciseObject, 'exercise' | 'supersetExercise'>
    ) {
      const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
        TYPES.ExerciseProvider
      );

      return parent.supersetExerciseId
        ? exerciseProvider.findExerciseById(parent.supersetExerciseId)
        : undefined;
    },
  },
};

export { routineTypeDefs, routineResolver };
