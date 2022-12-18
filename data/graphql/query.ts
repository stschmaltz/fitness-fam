import { appContainer } from '../../container/inversify.config';
import { TYPES } from '../../container/types';
import { ExerciseProviderInterface } from '../../providers/exercise.provider/exercise.provider.interface';
import { EQUIPMENT } from '../../types/exercise';

const queryTypeDefs = /* GraphQL */ `
  type Query {
    me: User!
    exercises: [Exercise!]!
    exercisesByEquipment(equipment: String!): [Exercise!]!
    exercise(id: String!): Exercise!
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
    ): Promise<
      import('c:/Projects/fitness-fam/types/exercise').ExerciseObject[]
    > {
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
  },
};

export { queryResolver, queryTypeDefs };
