import { useToast } from '@chakra-ui/react';
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
  const toast = useToast();

  const deleteRoutine = async ({
    routineId,
  }: DeleteRoutineInput): Promise<{
    errorMessage?: string;
    deletedRoutineId?: string;
  }> => {
    console.log('Deleting routine with id: ', routineId);

    const deleteFailedMessage = `Failed to delete routine with id: ${routineId}.`;
    try {
      const { deleteRoutine } = await asyncFetch(deleteRoutineMutationGraphQL, {
        input: { routineId },
      });

      if (!deleteRoutine.success) {
        throw new Error(deleteFailedMessage);
      }

      toast({
        title: `Successfully deleted routine.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      return { deletedRoutineId: routineId };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : deleteFailedMessage;
      console.log('Error saving routine', { errorMessage, error });

      toast({
        title: `Something went wrong deleting routine.`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      return { errorMessage };
    }
  };

  return { deleteRoutine };
}

export { useDeleteRoutine };
