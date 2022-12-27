import { Box, Flex, Image, List, ListItem, Text } from '@chakra-ui/react';
import { ExerciseObject } from '../types/exercise';

export default function BasicExerciseInfo(props: {
  hideGif?: boolean;
  exercise: ExerciseObject;
}) {
  const { exercise, hideGif = false } = props;
  return (
    <Box>
      <Flex justifyContent="center">
        <Text variant="h1">{exercise?.name}</Text>
      </Flex>
      <Flex flexDir="column" alignItems="flex-start" textAlign="left">
        <Flex mt={5} flexDir={'column'}>
          <Flex justifyContent="space-between" key="equipment">
            <Text as="span" variant="h3">
              Equipment:
            </Text>
            <Text pl={5} as="span">
              {exercise?.equipment}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" key="bodyArea">
            <Text as="span" variant="h3">
              Body Area:
            </Text>
            <Text pl={5} as="span">
              {exercise?.bodyArea}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" key="target">
            <Text as="span" variant="h3">
              Target Muscle:
            </Text>
            <Text pl={5} as="span">
              {exercise?.targetMuscle}
            </Text>
          </Flex>
        </Flex>
        {!hideGif && (
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
        )}
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
