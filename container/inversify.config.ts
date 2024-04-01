import 'reflect-metadata';

import { Container } from 'inversify';
import { TYPES } from './types';
import { mapExercises } from './mapExercises';
import { ExerciseSearchProviderInterface } from '../providers/exercise-searcher/exercise-search.provider.interface';
import { ExerciseSearcher } from '../providers/exercise-searcher/exercise-search.provider';
import exercises from '../data/exercises/exercises.json';
import { ExerciseProviderInterface } from '../providers/exercise.provider/exercise.provider.interface';
import { ExerciseProvider } from '../providers/exercise.provider/exercise.provider';
import { RoutineProvider } from '../providers/routine.provider/routine.provider';
import { RoutineProviderInterface } from '../providers/routine.provider/routine.provider.interface';

const appContainer = new Container();
// TODO: move map, make map less bad
const allExercises = mapExercises(exercises);

appContainer
  .bind<ExerciseSearchProviderInterface>(TYPES.ExerciseSearcher)
  .toConstantValue(new ExerciseSearcher(allExercises));

appContainer
  .bind<ExerciseProviderInterface>(TYPES.ExerciseProvider)
  .toConstantValue(new ExerciseProvider(allExercises));

appContainer
  .bind<RoutineProviderInterface>(TYPES.RoutineProvider)
  .toConstantValue(new RoutineProvider());
export { appContainer };
