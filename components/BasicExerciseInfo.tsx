import { Box, Image, List, ListItem, Text } from '@chakra-ui/react';
import { ExerciseObject } from '../types/exercise';

export default function BasicExerciseInfo(props: { exercise: ExerciseObject }) {
  const { exercise } = props;
  return (
    <Box>
      <Text fontSize="3xl">{exercise?.name}</Text>
      <List>
        <ListItem key="bodypart">
          {' '}
          <Text as="b">Body Part:</Text> {exercise?.bodyPart}
        </ListItem>
        <ListItem key="equipment">
          {' '}
          <Text as="b">Equipment:</Text> {exercise?.equipment}
        </ListItem>
        <ListItem key="target">
          {' '}
          <Text as="b">Target:</Text> {exercise?.target}
        </ListItem>
        <ListItem key="gif">
          <Box>
            <Image
              src={exercise?.gifUrl}
              alt="my gif"
              width={360}
              height={360}
            />
          </Box>
          {}
        </ListItem>
        {exercise?.instructions.length > 1 && (
          <ListItem key="instructions">
            <Text as="b">Instructions</Text>
            <List>
              {exercise?.instructions.map((instruction) => (
                <ListItem key={instruction.number}>
                  {instruction.description}
                </ListItem>
              ))}
            </List>
          </ListItem>
        )}
      </List>
    </Box>
  );
}
