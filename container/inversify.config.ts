import 'reflect-metadata';

import { Container } from 'inversify';
import { titleCase } from 'title-case';
import { TYPES } from './types';
import { ExerciseSearcherInterface } from '../providers/exercise-searcher/exercise-searcher.interface';
import { ExerciseSearcher } from '../providers/exercise-searcher/exercise-search.provider';
import exercises from '../data/exercises/exercises.json';
import { ExerciseProviderInterface } from '../providers/exercise.provider/exercise.provider.interface';
import { ExerciseProvider } from '../providers/exercise.provider/exercise.provider';
import { EQUIPMENT } from '../types/exercise';
import { RoutineProvider } from '../providers/routine.provider/routine.provider';
import { RoutineProviderInterface } from '../providers/routine.provider/routine.provider.interface';

const appContainer = new Container();
const allExercises = exercises.map((exercise) => ({
  ...exercise,
  name: titleCase(exercise.name),
  equipment: EQUIPMENT[exercise.equipment as keyof typeof EQUIPMENT],
}));
console.log('hi hello');

appContainer
  .bind<ExerciseSearcherInterface>(TYPES.ExerciseSearcher)
  .toConstantValue(new ExerciseSearcher(allExercises));

appContainer
  .bind<ExerciseProviderInterface>(TYPES.ExerciseProvider)
  .toConstantValue(new ExerciseProvider(allExercises));

appContainer
  .bind<RoutineProviderInterface>(TYPES.RoutineProvider)
  .toConstantValue(new RoutineProvider());
export { appContainer };
