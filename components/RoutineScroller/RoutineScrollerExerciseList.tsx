import { Flex } from '@chakra-ui/react';
import { RoutineScrollerExerciseListItem } from './RoutineScrollerListItem/RoutineScrollerExerciseListItem';
import { RoutineScrollerExerciseListSupersetItem } from './RoutineScrollerListItem/RoutineScrollerExerciseListSupersetItem';
import { RoutineExerciseObject } from '../../types/routine';
import { theme } from '../../styles/theme';

export function RoutineScrollerExerciseList(props: {
  exercises: RoutineExerciseObject[];
}) {
  const listBgColor = theme.colors.accent1['100'];
  const listBorderColor = theme.colors.accent1['700'];
  const borderStyle = `2px solid ${listBorderColor}`;

  return (
    <Flex
      flexDir="row"
      data-name="Routine exercise list"
      height="100%"
      bgColor={listBgColor}
      border={borderStyle}
      borderBottomRadius={'md'}
      borderTopRightRadius={'md'}
      paddingY={3}
    >
      {props.exercises.map((exercise) => {
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
