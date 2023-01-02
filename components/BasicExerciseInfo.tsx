import {
  Box,
  Flex,
  Image,
  List,
  ListItem,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ExerciseObject } from '../types/exercise';

export default function BasicExerciseInfo(props: {
  hideGif?: boolean;
  exercise: ExerciseObject;
  supersetExercise?: ExerciseObject | null;
}) {
  const { exercise, hideGif = false, supersetExercise } = props;
  const [showSuperset, setShowSuperset] = useState(false);

  const currentExercise =
    showSuperset && supersetExercise ? supersetExercise : exercise;
  return (
    <Box>
      <Flex justifyContent="center">
        <Text variant="h1">{currentExercise?.name}</Text>
      </Flex>
      <Flex flexDir="column" alignItems="flex-start" textAlign="left">
        <Flex mt={5} flexDir={'column'}>
          <Flex justifyContent="space-between" key="equipment">
            <Text as="span" variant="h3">
              Equipment:
            </Text>
            <Text pl={5} as="span">
              {currentExercise?.equipment}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" key="bodyArea">
            <Text as="span" variant="h3">
              Body Area:
            </Text>
            <Text pl={5} as="span">
              {currentExercise?.bodyArea}
            </Text>
          </Flex>
          <Flex justifyContent="space-between" key="target">
            <Text as="span" variant="h3">
              Target Muscle:
            </Text>
            <Text pl={5} as="span">
              {currentExercise?.targetMuscle}
            </Text>
          </Flex>
        </Flex>
        {!hideGif && (
          <Box key="gif">
            <Box>
              <Image
                src={currentExercise?.gifUrl}
                alt="my gif"
                width={360}
                height={360}
              />
            </Box>
          </Box>
        )}
        {currentExercise?.instructions?.length > 1 && (
          <Box key="instructions">
            <Text variant="h3">Instructions</Text>
            <List>
              {currentExercise?.instructions.map((instruction, index) => (
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
        {supersetExercise && (
          <Flex w="100%" justifyContent={'center'}>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              textAlign={'center'}
            >
              <Text
                color={'secondary'}
                fontWeight={'semibold'}
                as="span"
                fontSize={'sm'}
              >
                Show Superset
              </Text>
              <Switch
                colorScheme={'brandSecondary'}
                onChange={() => {
                  setShowSuperset(!showSuperset);
                }}
              ></Switch>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
