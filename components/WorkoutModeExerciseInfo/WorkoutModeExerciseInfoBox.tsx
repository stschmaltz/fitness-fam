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
    <Box pos={'relative'} w="100%">
      <Flex
        top={0}
        justifyContent="center"
        w="100%"
        pos={'absolute'}
        alignItems={'center'}
        h={[32, 32, 32, 32, 32, 44]}
      >
        <Text
          textAlign={'center'}
          variant="h1"
          lineHeight={'shorter'}
          fontSize={['3xl', '3xl', '3xl', '3xl', '3xl', '5xl']}
        >
          {exercise?.name}
        </Text>
      </Flex>
      <Box pt={[32, 32, 32, 32, 32, 44]}>
        <Box
          maxH={['43vh', '41vh', '41vh', '31vh', '41vh', '48vh']}
          overflow={'auto'}
        >
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

            <Flex justifyContent={'center'} key="gif">
              <Image
                opacity={hideGif ? 0 : 1}
                src={exercise?.gifUrl}
                width={['300px', '300px', '300px', '300px', '300px', '500px']}
                alt="my gif"
                fill={'contain'}
              />
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
            </Flex>

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
      </Box>
    </Box>
  );
}
