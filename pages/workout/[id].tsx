import { useRouter } from 'next/router';

import { useState } from 'react';
import { Box, Switch } from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import Link from 'next/dist/client/link';
import Layout from '../../components/layout';
import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import BasicLoader from '../../components/BasicLoader';
import { fullRoutine } from '../../data/graphql/snippets/routine';
import { useUserSignIn } from '../../hooks/use-user-sign-in.hook';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';
import WorkoutModeExerciseInfo from '../../components/WorkoutModeExerciseInfo/WorkoutModeExerciseInfoBox';
import WorkoutModeSetsAndReps from '../../components/WorkoutModeExerciseInfo/WorkoutModeSetsAndReps';
import StopWatch from '../../components/StopWatch';
import WorkoutModeProgressBar from '../../components/WorkoutModeExerciseInfo/WorkoutModeProgressBar';

export default function WorkoutModePage(props: { routine?: RoutineObject }) {
  const { routine } = props;
  const router = useRouter();

  const [currentExercise, setCurrentExercise] = useState<
    RoutineExerciseObject | undefined
  >(routine?.exercises[0]);

  const currentExerciseIndex = currentExercise?.order ?? 0;
  const currentExerciseListNumber = currentExerciseIndex + 1;
  const [showSuperset, setShowSuperset] = useState(false);

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
      <Box bgColor={'white'} pos="relative" h={'85vh'}>
        <Box>
          <WorkoutModeExerciseInfo
            exercise={
              showSuperset && currentExercise.supersetExercise
                ? currentExercise.supersetExercise
                : currentExercise.exercise
            }
          />
        </Box>
      </Box>
      <Box pos={'relative'} h="100%" mt={4}>
        <Box pos="absolute" bottom={0} w={'100%'}>
          <Flex mb={1} justifyContent={'center'}>
            <Box p={2} bgColor={'white'} borderRadius={'lg'}>
              <StopWatch currentExercise={currentExercise} />
            </Box>
            {/* <Box p={2} bgColor={'white'} borderRadius={'lg'}>
              <Text variant={'h3'} fontSize={'md'}>
                Notes
              </Text>
              <Textarea
                defaultValue={'This does nothing yet, save coming soon.'}
              />
            </Box> */}
          </Flex>
          <Flex justifyContent={'space-between'}>
            <WorkoutModeSetsAndReps
              currentExercise={currentExercise}
              showSuperset={showSuperset}
            />
            {currentExercise.supersetExercise && (
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
                  Superset
                </Text>
                <Switch
                  colorScheme={'brandSecondary'}
                  onChange={() => {
                    setShowSuperset(!showSuperset);
                  }}
                ></Switch>
              </Flex>
            )}
          </Flex>
          <WorkoutModeProgressBar
            currentValue={currentExerciseListNumber}
            maxValue={routine.exercises.length}
            handlePreviousClicked={() => {
              setCurrentExercise(
                routine.exercises[Math.max(currentExerciseIndex - 1, 0)]
              );
            }}
            handleNextClicked={() => {
              setCurrentExercise(
                routine.exercises[
                  Math.min(currentExerciseListNumber, routine.exercises.length)
                ]
              );
            }}
            handleCompleteClicked={() => {
              router.push('/');
            }}
          />
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
