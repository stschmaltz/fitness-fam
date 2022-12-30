import { useRouter } from 'next/router';

import { useState } from 'react';
import { Box, Progress } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import Link from 'next/dist/client/link';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import Layout from '../../components/layout';
import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import BasicLoader from '../../components/BasicLoader';
import { fullRoutine } from '../../data/graphql/snippets/routine';
import { useUserSignIn } from '../../hooks/use-user-sign-in.hook';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';
import WorkoutModeExerciseInfo from '../../components/WorkoutModeExerciseInfo/WorkoutModeExerciseInfoBox';
import WorkoutModeSetsAndReps from '../../components/WorkoutModeExerciseInfo/WorkoutModeSetsAndReps';
import StopWatch from '../../components/StopWatch';

export default function EditRoutinePage(props: { routine?: RoutineObject }) {
  const { routine } = props;
  const router = useRouter();

  const [currentExercise, setCurrentExercise] = useState<
    RoutineExerciseObject | undefined
  >(routine?.exercises[0]);

  const currentExerciseIndex = currentExercise?.order ?? 0;
  const currentExerciseListNumber = currentExerciseIndex + 1;

  const [isLoading, currentUser, _setCurrentUser] = useUserSignIn();

  if (isLoading || !currentExercise)
    return (
      <Box h="80vh">
        <BasicLoader />
      </Box>
    );

  if (!currentUser) {
    return (
      // TODO: real 401 page
      <Layout showReturnToHome={true}>
        <div>401: Not Authorized</div>
      </Layout>
    );
  }

  if (!routine) {
    // TODO: real 404 page
    return (
      <Layout showReturnToHome={true}>
        <div>404: Routine not found</div>
      </Layout>
    );
  }

  return (
    <Layout showReturnToHome={false}>
      <Link href={'/'}>Return to home</Link>
      <Box pos="relative" minH="88vh">
        <Box maxH="81vh" overflow={'auto'} pb={20}>
          <WorkoutModeExerciseInfo
            exercise={currentExercise.exercise}
          ></WorkoutModeExerciseInfo>
          <StopWatch currentExercise={currentExercise} />
        </Box>
        <Box pos="absolute" bottom={0} w={'100%'} backgroundColor="white">
          <WorkoutModeSetsAndReps currentExercise={currentExercise} />
          <Flex justifyContent={'space-between'}></Flex>
          <Box mt={3}>
            <Progress
              max={routine.exercises.length}
              value={currentExerciseListNumber}
              size="sm"
              colorScheme="brandPrimary"
            />
            <Flex w={'100%'} justifyContent={'space-between'} mt={2}>
              <Button
                disabled={!currentExerciseIndex || currentExerciseIndex === 0}
                leftIcon={<ArrowBackIcon />}
                variant={'outline'}
                onClick={() => {
                  setCurrentExercise(
                    routine.exercises[Math.max(currentExerciseIndex - 1, 0)]
                  );
                }}
              >
                Previous
              </Button>

              <Flex flexGrow={2} flexShrink={1} justifyContent={'center'}>
                <Text fontWeight={'bold'}>
                  {currentExerciseListNumber}/{routine.exercises.length}
                </Text>
              </Flex>
              {currentExerciseListNumber < routine.exercises.length ? (
                <Button
                  colorScheme={'brandPrimary'}
                  rightIcon={<ArrowForwardIcon />}
                  onClick={() => {
                    setCurrentExercise(
                      routine.exercises[
                        Math.min(
                          currentExerciseListNumber,
                          routine.exercises.length
                        )
                      ]
                    );
                  }}
                >
                  <Text fontWeight={'semibold'} fontSize={'lg'} color="white">
                    Next
                  </Text>
                </Button>
              ) : (
                <Button
                  colorScheme={'brandPrimary'}
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  Complete
                </Button>
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}

export const getServerSideProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  try {
    const routine = await asyncFetch(
      `{ routine(id:"${query.id}"){ ${fullRoutine} } }`
    );

    return {
      props: routine,
    };
  } catch (error) {
    console.log('error', error);

    return {
      props: {},
    };
  }
};
