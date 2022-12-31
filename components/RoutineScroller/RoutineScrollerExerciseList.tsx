import { Flex } from '@chakra-ui/react';
import RoutineScrollerExerciseListItem from './RoutineScrollerExerciseListItem';
import RoutineScrollerExerciseListSupersetItem from './RoutineScrollerExerciseListSupersetItem';
import { RoutineExerciseObject } from '../../types/routine';

export default function RoutineScrollerExerciseList(props: {
  exercises: RoutineExerciseObject[];
}) {
  return (
    <Flex flexDir="row" data-name="Routine exercise list" height="100%">
      {props.exercises.map((exercise) => {
        console.log(exercise.supersetExercise);

        return exercise.supersetExercise ? (
          <RoutineScrollerExerciseListSupersetItem
            key={exercise.id}
            exercise={exercise}
          />
        ) : (
          <RoutineScrollerExerciseListItem
            key={exercise.id}
            exercise={exercise}
          />
        );
      })}
    </Flex>
  );
}
