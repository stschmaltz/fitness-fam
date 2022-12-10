import { Button, Container, Input, List, ListItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { Text } from '@chakra-ui/react';

import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import utilStyles from '../styles/utils.module.css';
import Layout from '../components/layout.js';
import { ExerciseObject } from '../types/exercise.js';
import { RoutineExerciseObject, RoutineObject } from '../types/routine.js';
import { theme } from '../styles/theme';

export default function Exercises() {
  const getRoutineItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '8px',
    margin: `0 0 2px 0`,

    background: isDragging ? theme.colors.gray[300] : theme.colors.gray[100],

    ...draggableStyle,
  });

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    id: '1',
    name: 'New Routine ' + '1',
    exercises: [
      { id: '1001', name: 'Test Exercise1', order: 1 },
      { id: '2001', name: 'Test Exercise2', order: 2 },
      { id: '3001', name: 'Test Exercise3', order: 3 },
      { id: '4001', name: 'Test Exercise4', order: 4 },
    ],
    order: -1,
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    console.log(result);
    console.log('old' + currentRoutine);
    const movedExercise = currentRoutine.exercises.find(
      (exercise) => exercise.id === result.draggableId
    );
    console.log('movedExercise' + JSON.stringify(movedExercise));
    const newRoutine = {
      ...currentRoutine,
      exercises: reorder(
        currentRoutine.exercises,
        result.source.index,
        result.destination.index
      ).map((exercise: ExerciseObject, index) => ({
        ...exercise,
        order: index,
      })),
    };

    console.log('new' + newRoutine);
    setCurrentRoutine(newRoutine);
  };
  const handleRoutineNameChange = (event) => {
    if (event.target.value === '') return;
    console.log('handleRoutineNameChange: ' + event.target.value);
    setCurrentRoutine({ ...currentRoutine, name: event.target.value });
    console.log('currentRoutine: ' + JSON.stringify(currentRoutine));
  };

  return (
    <Layout home={false}>
      <Container>
        <Input
          variant="flushed"
          placeholder="New Routine"
          value={currentRoutine.name}
          onChange={handleRoutineNameChange}
          mb={10}
          fontSize="3xl"
        />

        <DragDropContext onDragEnd={onDragEnd}>
          {currentRoutine?.exercises.length > 0 && (
            <Droppable droppableId={currentRoutine.id} type="LIST">
              {/* <OrderedList> */}
              {(provided, _snapshot) => (
                <List {...provided.droppableProps} ref={provided.innerRef}>
                  {currentRoutine?.exercises.map(
                    (exercise: RoutineExerciseObject, index: number) => {
                      return (
                        <Draggable
                          draggableId={exercise.id}
                          index={index}
                          key={exercise.id}
                        >
                          {(provided, snapshot) => (
                            <Text
                              className={utilStyles.onDrag}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getRoutineItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              {exercise.name}
                            </Text>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                  {/* </OrderedList> */}
                </List>
              )}
            </Droppable>
          )}
        </DragDropContext>
      </Container>
      <Container m={100} />
      <Container>
        <Text fontSize="4xl">Exercises</Text>
        <List>
          {[
            {
              bodyPart: 'waist',
              equipment: 'BODY_WEIGHT',
              gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif',
              id: '0001',
              name: '3/4 sit-up',
              target: 'abs',
              instructions: [],
            },
            {
              bodyPart: 'waist',
              equipment: 'BODY_WEIGHT',
              gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif',
              id: '0002',
              name: '45° side bend',
              target: 'abs',
              instructions: [],
            },
          ].map((exercise) => (
            <ListItem key={exercise.id}>
              <Button>
                <AddIcon mr="2" />
                {exercise.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
    </Layout>
  );
}
