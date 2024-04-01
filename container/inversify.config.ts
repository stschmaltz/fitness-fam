import 'reflect-metadata';

import { Container } from 'inversify';
import { titleCase } from 'title-case';
import { TYPES } from './types';
import { ExerciseSearchProviderInterface } from '../providers/exercise-searcher/exercise-search.provider.interface';
import { ExerciseSearcher } from '../providers/exercise-searcher/exercise-search.provider';
import exercises from '../data/exercises/exercises.json';
import { ExerciseProviderInterface } from '../providers/exercise.provider/exercise.provider.interface';
import { ExerciseProvider } from '../providers/exercise.provider/exercise.provider';
import { RoutineProvider } from '../providers/routine.provider/routine.provider';
import { RoutineProviderInterface } from '../providers/routine.provider/routine.provider.interface';
import { ExerciseObject } from '../types/exercise';

const appContainer = new Container();
const allExercises = exercises.map((exercise) => ({
  name: titleCase(exercise.name),
  targetMuscle: exercise.target,
  equipment: exercise.equipment,
  bodyArea: exercise.secondaryMuscles[0],
  gifUrl: exercise.gifUrl,
  id: exercise.id,
  instructions: exercise.instructions.map((instruction, index) => ({
    number: index + 1,
    description: instruction,
  })),
})) as ExerciseObject[]; // TODO fix enum typing

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
