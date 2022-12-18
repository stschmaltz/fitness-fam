import { Box, Flex, IconButton, List } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { CSSProperties } from 'react';

import { RoutineExerciseObject, RoutineObject } from '../types/routine';
import { theme } from '../styles/theme';

export default function CurrentRoutineList(props: {
  currentRoutine: RoutineObject;
  handleOnDragEnd: (result: DropResult) => void;
  handleRemoveExerciseFromRoutine: (exerciseId: string) => void;
}) {
  const { currentRoutine } = props;
  const getRoutineItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined
  ): CSSProperties => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '6px',
    margin: `0 0 1px 0`,

    background: isDragging
      ? theme.colors.brandPrimary['100']
      : theme.colors.brandLight,

    ...draggableStyle,
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    props.handleOnDragEnd(result);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    props.handleRemoveExerciseFromRoutine(exerciseId);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={currentRoutine._id.toString()} type="LIST">
        {(provided, _snapshot) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            <Box>
              <Flex justifyContent="space-between" pr={1}>
                <Text minW="5rem" pr="2rem" as="b" fontSize="lg">
                  Order
                </Text>
                <Text flexGrow="1" as="b" fontSize="lg">
                  Exercise
                </Text>
                <Text as="b" fontSize="lg">
                  Remove
                </Text>
              </Flex>
            </Box>

            {currentRoutine?.exercises.map(
              (exercise: RoutineExerciseObject, index: number) => {
                return (
                  <Draggable
                    draggableId={exercise.id}
                    index={index}
                    key={exercise.id}
                  >
                    {(provided, snapshot) => (
                      <Flex
                        justifyContent="space-between"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getRoutineItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <Box minW="4rem" pr="3.2rem" pl="1rem">
                          <Text fontSize="lg">{exercise.order + 1}</Text>
                        </Box>
                        <Box flexGrow="1">
                          <Text fontSize="lg">{exercise.name}</Text>
                        </Box>
                        <Flex>
                          <IconButton
                            onClick={() =>
                              handleRemoveExerciseFromRoutine(exercise.id)
                            }
                            colorScheme="brandPrimary"
                            aria-label="Remove Exercise From Routine"
                            icon={<MinusIcon />}
                          />
                        </Flex>
                      </Flex>
                    )}
                  </Draggable>
                );
              }
            )}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}
