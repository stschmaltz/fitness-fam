import { useEffect, useState } from 'react';
import { appContainer } from '../container/inversify.config';
import { TYPES } from '../container/types';
import { ExerciseProviderInterface } from '../providers/exercise.provider/exercise.provider.interface';
import { ExerciseObject } from '../types/exercise';

function useGetAllExercises(): readonly [ExerciseObject[]] {
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);

  const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
    TYPES.ExerciseProvider,
  );
  useEffect(() => {
    const fetchExercises = async () => {
      const allExercises = await exerciseProvider.getAllExercises();
      setExercises(allExercises);
    };
    fetchExercises();
  }, [exerciseProvider, setExercises]);

  return [exercises] as const;
}

export { useGetAllExercises };
