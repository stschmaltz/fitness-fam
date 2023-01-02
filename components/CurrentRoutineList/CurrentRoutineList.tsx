import { Box, Flex, List, Text } from '@chakra-ui/react';

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useState } from 'react';

import CurrentRoutineListItem from './CurrentRoutineListItem';
import ExerciseInfoModal from '../ExerciseInfoModal';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';
import { ExerciseObject } from '../../types/exercise';

export default function CurrentRoutineList(props: {
  handleRepsChange: (exercise: RoutineExerciseObject, value: string) => void;
  handleSupersetRepsChange: (
    exercise: RoutineExerciseObject,
    value: string
  ) => void;
  handleSetsChange: (exercise: RoutineExerciseObject, value: string) => void;
  currentRoutine: RoutineObject;
  handleOnDragEnd: (result: DropResult) => void;
  handleRemoveExerciseFromRoutine: (exerciseId: string) => void;
  handleSplitExerciseSuperset: (exerciseId: string) => void;
}) {
  const { currentRoutine } = props;
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseObject | undefined
  >(undefined);

  const onDragEnd = (result: DropResult) => {
    props.handleOnDragEnd(result);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    props.handleRemoveExerciseFromRoutine(exerciseId);
  };

  const handleSplitExerciseSuperset = (exerciseId: string) => {
    props.handleSplitExerciseSuperset(exerciseId);
  };

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

  const showExerciseInfo = (exercise: ExerciseObject) => {
    setSelectedExercise(exercise);
  };

  // TODO: refactor info button to be a component with the info modal
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        isCombineEnabled
        droppableId={currentRoutine._id.toString()}
        type="LIST"
      >
        {(provided, _snapshot) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {selectedExercise && (
              <ExerciseInfoModal
                exercise={selectedExercise}
                handleModalOnClose={() => setSelectedExercise(undefined)}
                isOpen={selectedExercise !== undefined}
              />
            )}
            <Box>
              <Flex justifyContent="space-between" pr={1}>
                <Text minW="5rem" pr="2rem" as="b" fontSize="lg">
                  Order
                </Text>
                <Text flexGrow="1" as="b" fontSize="lg">
                  Exercise
                </Text>
                <Text as="b" fontSize="lg">
                  Sets
                </Text>
                <Text pl={2} as="b" fontSize="lg">
                  Reps
                </Text>
                <Box flexShrink={0} w={12}></Box>
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
                      <CurrentRoutineListItem
                        exercise={exercise}
                        handleRemoveExerciseFromRoutine={
                          handleRemoveExerciseFromRoutine
                        }
                        showExerciseInfo={showExerciseInfo}
                        handleSetsChange={handleSetsChange}
                        handleSupersetRepsChange={handleSupersetRepsChange}
                        handleRepsChange={handleRepsChange}
                        provided={provided}
                        snapshot={snapshot}
                        handleSplitExerciseSuperset={
                          handleSplitExerciseSuperset
                        }
                      />
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
