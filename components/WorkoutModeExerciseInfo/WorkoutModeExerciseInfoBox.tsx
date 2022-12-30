import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import WorkoutModeExerciseInfoBox from './WorkoutModeInfoBox';
import { ExerciseObject } from '../../types/exercise';

export default function WorkoutModeExerciseInfo(props: {
  exercise: ExerciseObject;
}) {
  const { exercise } = props;
  const [hideGif, setHideGif] = useState(false);

  return (
    <Box>
      <Flex justifyContent="center">
        <Text variant="h1">{exercise?.name}</Text>
      </Flex>
      <Flex flexDir={'column'}>
        <Flex
          flexDir={'row'}
          justifyContent={'space-between'}
          width={'100%'}
          fontSize={'md'}
        >
          <WorkoutModeExerciseInfoBox
            title={'Equipment'}
            value={exercise?.equipment}
          />
          <WorkoutModeExerciseInfoBox
            title={'Body Area'}
            value={exercise?.bodyArea}
          />
          <WorkoutModeExerciseInfoBox
            title={'Target Muscle'}
            value={exercise?.targetMuscle}
          />
        </Flex>
        <Box key="gif">
          <Image
            opacity={hideGif ? 0 : 1}
            src={exercise?.gifUrl}
            alt="my gif"
            width={360}
            height={360}
          />
        </Box>
        {hideGif ? (
          <ViewIcon
            color={'gray'}
            onClick={() => setHideGif(!hideGif)}
          ></ViewIcon>
        ) : (
          <ViewOffIcon
            color={'gray'}
            onClick={() => setHideGif(!hideGif)}
          ></ViewOffIcon>
        )}
        {/* {exercise?.instructions?.length > 1 && (
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
        )} */}
      </Flex>
    </Box>
  );
}
