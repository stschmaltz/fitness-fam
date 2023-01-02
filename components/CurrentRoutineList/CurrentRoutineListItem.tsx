import { LinkIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/react';
import { CSSProperties } from 'react';
import {
  DraggableProvided,
  DraggableStateSnapshot,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { theme } from '../../styles/theme';
import { ExerciseObject } from '../../types/exercise';
import { RoutineExerciseObject } from '../../types/routine';
import { SplitIcon } from '../Icons';

export default function CurrentRoutineListItem(props: {
  showExerciseInfo: (exercise: ExerciseObject) => void;
  exercise: RoutineExerciseObject;
  handleRepsChange: (exercise: RoutineExerciseObject, value: string) => void;
  handleSupersetRepsChange: (
    exercise: RoutineExerciseObject,
    value: string
  ) => void;
  handleSetsChange: (exercise: RoutineExerciseObject, value: string) => void;
  handleRemoveExerciseFromRoutine: (exerciseId: string) => void;
  handleSplitExerciseSuperset: (exerciseId: string) => void;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}) {
  const { showExerciseInfo, exercise, provided, snapshot } = props;
  const getRoutineItemStyle = ({
    draggableStyle,
    isDragging,
    isCombining,
  }: {
    isDragging: boolean;
    isCombining: boolean;
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined;
  }): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '6px',
    margin: `0 0 1px 0`,
    scale: isCombining ? 0.5 : 1,
    background: isCombining
      ? theme.colors.brandPrimary['50']
      : isDragging
      ? theme.colors.brandPrimary['100']
      : theme.colors.brandLight,

    ...draggableStyle,
  });

  const handleRepsChange = (exercise: RoutineExerciseObject, value: string) => {
    props.handleRepsChange(exercise, value);
  };

  const handleSupersetRepsChange = (
    exercise: RoutineExerciseObject,
    value: string
  ) => {
    props.handleSupersetRepsChange(exercise, value);
  };

  const handleSetsChange = (exercise: RoutineExerciseObject, value: string) => {
    props.handleSetsChange(exercise, value);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    props.handleRemoveExerciseFromRoutine(exerciseId);
  };

  const handleSplitExerciseSuperset = (exerciseId: string) => {
    props.handleSplitExerciseSuperset(exerciseId);
  };

  const RemoveExerciseButton = (
    <IconButton
      onClick={() => handleRemoveExerciseFromRoutine(exercise.id)}
      colorScheme="brandPrimary"
      aria-label="Remove Exercise From Routine"
      icon={<MinusIcon />}
    />
  );
  const RepChangeInput = (
    <NumberInput
      defaultValue={exercise.reps}
      min={1}
      max={99}
      onChange={(valueString) => handleRepsChange(exercise, valueString)}
    >
      <NumberInputField p={2} />
    </NumberInput>
  );

  const SetsChangeInput = (
    <NumberInput
      defaultValue={exercise.sets}
      min={1}
      max={99}
      onChange={(valueString) => handleSetsChange(exercise, valueString)}
    >
      <NumberInputField p={2} />
    </NumberInput>
  );

  return exercise.supersetExerciseId && !!exercise.supersetExercise ? (
    <Flex
      borderTop={'1px solid' + theme.colors.brandPrimary['50']}
      justifyContent="space-between"
      flexDir={'column'}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getRoutineItemStyle({
        isDragging: snapshot.isDragging,
        isCombining: !!snapshot.combineWith,
        draggableStyle: provided.draggableProps.style,
      })}
    >
      <Flex justifyContent="space-between">
        <Flex minW="4rem" pl="1rem">
          <Text fontSize="lg">{exercise.order + 1}</Text>
        </Flex>

        <Box onClick={() => showExerciseInfo(exercise.exercise)} flexGrow="1">
          <Text fontSize="lg">{exercise.name}</Text>
        </Box>
        <Box px={1} maxW={'2.8rem'}>
          {SetsChangeInput}
        </Box>
        <Box pr={2} maxW={'2.8rem'}>
          {RepChangeInput}
        </Box>
        <Flex>{RemoveExerciseButton}</Flex>
      </Flex>

      <Flex pos={'relative'} mt={2} justifyContent="space-between">
        <Box pos={'absolute'} top={-8} left={-2}></Box>

        <Flex
          flexDir={'column'}
          minW="4rem"
          alignItems={'center'}
          pt={2}
          justifyContent={'flex-start'}
          pr={1}
        >
          <LinkIcon color={theme.colors.accent2['50']} fontSize={'lg'} mr={3} />
        </Flex>

        <Box
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          onClick={() => showExerciseInfo(exercise.supersetExercise!)}
          flexGrow="1"
        >
          <Text fontSize="lg">{exercise.supersetExercise.name}</Text>
        </Box>

        <Box pr={2} maxW={'2.8rem'}>
          <NumberInput
            defaultValue={exercise.supersetReps}
            min={1}
            max={99}
            onChange={(valueString) =>
              handleSupersetRepsChange(exercise, valueString)
            }
          >
            <NumberInputField p={2} />
          </NumberInput>
        </Box>
        <Flex>
          <IconButton
            onClick={() => handleSplitExerciseSuperset(exercise.id)}
            colorScheme="brandSecondary"
            aria-label="Split Superset"
            fontSize={'xl'}
            fontWeight={'bold'}
            icon={<SplitIcon />}
          />
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex
      borderTop={'1px solid' + theme.colors.brandPrimary['50']}
      justifyContent="space-between"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getRoutineItemStyle({
        isDragging: snapshot.isDragging,
        isCombining: !!snapshot.combineWith,
        draggableStyle: provided.draggableProps.style,
      })}
    >
      <Flex minW="4rem" pl="1rem">
        <Text fontSize="lg">{exercise.order + 1}</Text>
      </Flex>

      <Box onClick={() => showExerciseInfo(exercise.exercise)} flexGrow="1">
        <Text fontSize="lg">{exercise.name}</Text>
      </Box>
      <Box px={1} maxW={'2.8rem'}>
        {SetsChangeInput}
      </Box>
      <Box pr={2} maxW={'2.8rem'}>
        {RepChangeInput}
      </Box>
      <Flex>{RemoveExerciseButton}</Flex>
      <Flex />
    </Flex>
  );
}
