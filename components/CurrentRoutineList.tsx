import { Flex, IconButton, List } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { RoutineExerciseObject, RoutineObject } from '../types/routine';
import { theme } from '../styles/theme';

export default function CurrentRoutineList(props: {
  currentRoutine: RoutineObject;
  handleOnDragEnd: (result: DropResult) => void;
  handleRemoveExerciseFromRoutine: (exerciseId: string) => void;
}) {
  const { currentRoutine } = props;
  const getRoutineItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '6px',
    margin: `0 0 1px 0`,

    background: isDragging ? theme.colors.gray[300] : theme.colors.gray[100],

    ...draggableStyle,
  });

  const onDragEnd = (result) => {
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
      <Droppable droppableId={currentRoutine.id} type="LIST">
        {(provided, _snapshot) => (
          <List
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ maxHeight: '40vh', overflow: 'auto' }}
          >
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
                        <Text>{exercise.order + 1}</Text>
                        <Text>{exercise.name}</Text>
                        <IconButton
                          onClick={() =>
                            handleRemoveExerciseFromRoutine(exercise.id)
                          }
                          colorScheme="blue"
                          aria-label="Remove Exercise From Routine"
                          icon={<DeleteIcon />}
                        />
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
