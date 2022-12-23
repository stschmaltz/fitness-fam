import { appContainer } from '../../container/inversify.config';
import { TYPES } from '../../container/types';
import { ExerciseProviderInterface } from '../../providers/exercise.provider/exercise.provider.interface';
import { findRoutineById } from '../../providers/routine-database.provider';
import { EQUIPMENT } from '../../types/exercise';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    me: User!
    exercises: [Exercise!]!
    exercisesByEquipment(equipment: String!): [Exercise!]!
    exercise(id: String!): Exercise
    routine(id: String!): Routine
  }
`;

const queryResolver = {
  Query: {
    async me() {
      return { name: 'Shane Schmaltz' };
    },

    async exercises() {
      const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
        TYPES.ExerciseProvider
      );

      return exerciseProvider.getAllExercises();
    },

    async exercisesByEquipment(
      _: never,
      { equipment }: { equipment: EQUIPMENT }
    ) {
      const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
        TYPES.ExerciseProvider
      );

      return exerciseProvider.getExercisesByEquipment(equipment);
    },

    async exercise(_: never, { id }: { id: string }) {
      const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
        TYPES.ExerciseProvider
      );

      return exerciseProvider.findExerciseById(id);
    },

    async routine(_: never, { id }: { id: string }) {
      const routine = await findRoutineById(id);

      return routine;
    },
  },
};

export { queryResolver, queryTypeDefs };
