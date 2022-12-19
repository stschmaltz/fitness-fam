import { Box, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';
import { ExerciseObject } from '../types/exercise';

export default function BasicExerciseInfo(props: { exercise: ExerciseObject }) {
  const { exercise } = props;
  return (
    <Box>
      <Flex justifyContent="center">
        <Text variant="h1">{exercise?.name}</Text>
      </Flex>
      <Flex flexDir="column" alignItems="flex-start" textAlign="left">
        <Flex mt={5} w="100%" justifyContent="space-between">
          <Box key="equipment">
            <Text variant="h3">Equipment:</Text>
            <Text>{exercise?.equipment}</Text>
          </Box>
          <Box key="target">
            <Text variant="h3">Target Muscle:</Text>
            <Text>{exercise?.targetMuscle}</Text>
          </Box>
        </Flex>
        <Box key="gif">
          <Box>
            <Image
              src={exercise?.gifUrl}
              alt="my gif"
              width={360}
              height={360}
            />
          </Box>
        </Box>
        {exercise?.instructions?.length > 1 && (
          <Box key="instructions">
            <Text variant="h3">Instructions</Text>
            <List>
              {exercise?.instructions.map((instruction, index) => (
                <ListItem mt={3} key={instruction.number}>
                  <Text fontSize="lg">
                    <b>{index + 1}. </b>
                    {instruction.description}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
