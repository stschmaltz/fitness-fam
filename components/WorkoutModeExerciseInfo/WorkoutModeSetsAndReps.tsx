import {
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import { RoutineExerciseObject } from '../../types/routine';

export default function WorkoutModeSetsAndReps(props: {
  currentExercise: RoutineExerciseObject;
  showSuperset: boolean;
}) {
  const { currentExercise, showSuperset } = props;
  const [exerciseSetsValue, setExerciseSetsValue] = useState(0);

  const reps = showSuperset
    ? currentExercise.supersetReps
    : currentExercise.reps;

  useEffect(() => {
    setExerciseSetsValue(currentExercise?.sets ?? 0);
  }, [currentExercise]);
  return (
    <Flex justifyContent={'flex-start'} minW={'300px'}>
      {currentExercise.sets ? (
        <Flex mb={1}>
          <Text
            color={theme.colors.brandSecondary[700]}
            fontSize={'3xl'}
            fontWeight={'bold'}
          >
            Sets:{' '}
          </Text>
          <NumberInput
            pl={1}
            maxW={'5.3rem'}
            size="lg"
            defaultValue={currentExercise.sets}
            value={exerciseSetsValue}
            max={99}
          >
            <NumberInputField
              color={theme.colors.brandSecondary[700]}
              _disabled={{ color: theme.colors.brandSecondary[700] }}
              disabled
              fontWeight={'bold'}
              fontSize={'3xl'}
            />
            <NumberInputStepper>
              <NumberIncrementStepper
                onClick={() => setExerciseSetsValue(exerciseSetsValue + 1)}
              />
              <NumberDecrementStepper
                onClick={() => setExerciseSetsValue(exerciseSetsValue - 1)}
              />
            </NumberInputStepper>
          </NumberInput>
        </Flex>
      ) : (
        <Box />
      )}

      {reps ? (
        <Text
          color={theme.colors.brandSecondary[700]}
          fontSize={'3xl'}
          fontWeight={'bold'}
          pl={5}
        >
          Reps: {reps}
        </Text>
      ) : (
        <Box />
      )}
    </Flex>
  );
}
