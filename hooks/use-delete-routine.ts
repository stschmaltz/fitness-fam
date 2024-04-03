import { asyncFetch } from '../data/graphql/graphql-fetcher';
import { deleteRoutineMutationGraphQL } from '../data/graphql/snippets/mutation';

interface DeleteRoutineInput {
  routineId: string;
}

function useDeleteRoutine(): {
  deleteRoutine: (input: DeleteRoutineInput) => Promise<{
    errorMessage?: string;
    deletedRoutineId?: string;
  }>;
} {
  const deleteRoutine = async ({
    routineId,
  }: DeleteRoutineInput): Promise<{
    errorMessage?: string;
    deletedRoutineId?: string;
  }> => {
    console.log('Deleting routine with id: ', routineId);

    const deleteFailedMessage = `Failed to delete routine with id: ${routineId}.`;
    try {
      const result = await asyncFetch(deleteRoutineMutationGraphQL, {
        input: { routineId },
      });

      if (!result.success) {
        throw new Error(deleteFailedMessage);
      }

      return { deletedRoutineId: routineId };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : deleteFailedMessage;
      console.log('Error saving routine', { errorMessage, error });

      return { errorMessage };
    }
  };

  return { deleteRoutine };
}

export { useDeleteRoutine };
