import { Button, List, ListItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { useState } from 'react';
import { EQUIPMENT, ExerciseObject } from '../types/exercise';

export default function ExerciseSearchList(props: {
  handleExerciseOnClick: (exercise: ExerciseObject) => void;
}) {
  const fakeSearchResults = [
    {
      bodyPart: 'waist',
      equipment: EQUIPMENT.BODY_WEIGHT,
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0001.gif',
      id: '0001',
      name: '3/4 sit-up',
      target: 'abs',
      instructions: [],
    },
    {
      bodyPart: 'waist',
      equipment: EQUIPMENT.BODY_WEIGHT,
      gifUrl: 'http://d205bpvrqc9yn1.cloudfront.net/0002.gif',
      id: '0002',
      name: '45° side bend',
      target: 'abs',
      instructions: [],
    },
  ];

  const [searchResults, setSearchResults] =
    useState<ExerciseObject[]>(fakeSearchResults);

  const handleExerciseOnClick = (exercise: ExerciseObject) => {
    const newSearchResults = searchResults.filter(
      (searchResult) => searchResult.id !== exercise.id
    );
    setSearchResults(newSearchResults);

    return props.handleExerciseOnClick(exercise);
  };

  return (
    <List>
      {searchResults.map((exercise) => (
        <ListItem key={exercise.id}>
          <Button
            leftIcon={<AddIcon mr="2" />}
            onClick={() => handleExerciseOnClick(exercise as ExerciseObject)}
          >
            {exercise.name}
          </Button>
        </ListItem>
      ))}
    </List>
  );
}
