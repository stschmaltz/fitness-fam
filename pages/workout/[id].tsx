import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import {
  Box,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Progress,
} from '@chakra-ui/react';
import { Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import Link from 'next/dist/client/link';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Layout from '../../components/layout';
import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import BasicLoader from '../../components/BasicLoader';
import { fullRoutine } from '../../data/graphql/snippets/routine';
import { useUserSignIn } from '../../hooks/use-user-sign-in.hook';
import { RoutineExerciseObject, RoutineObject } from '../../types/routine';
import BasicExerciseInfo from '../../components/BasicExerciseInfo';

export default function EditRoutinePage(props: { routine?: RoutineObject }) {
  const { routine } = props;
  const router = useRouter();

  const [hideGif, setHideGif] = useState(false);
  const [exerciseSetsValue, setExerciseSetsValue] = useState(0);
  const [currentExercise, setCurrentExercise] = useState<
    RoutineExerciseObject | undefined
  >(routine?.exercises[0]);

  useEffect(() => {
    setExerciseSetsValue(currentExercise?.sets ?? 0);
  }, [currentExercise]);

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
      <Box pos="relative" minH="90vh">
        <Box maxH="90vh" overflow={'auto'} pb={20}>
          <BasicExerciseInfo
            hideGif={hideGif}
            exercise={currentExercise.exercise}
          ></BasicExerciseInfo>
        </Box>
        <Box pos="absolute" bottom={0} w={'100%'} backgroundColor="white">
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
          <Flex justifyContent={'flex-start'}>
            {currentExercise.sets ? (
              <>
                <Text fontSize={'3xl'} fontWeight={'bold'}>
                  Sets:{' '}
                </Text>
                <NumberInput
                  pl={1}
                  maxW={'5.3rem'}
                  size="lg"
                  defaultValue={currentExercise.sets}
                  value={exerciseSetsValue}
                  max={99}
                >
                  <NumberInputField fontWeight={'bold'} fontSize={'3xl'} />
                  <NumberInputStepper>
                    <NumberIncrementStepper
                      onClick={() =>
                        setExerciseSetsValue(exerciseSetsValue + 1)
                      }
                    />
                    <NumberDecrementStepper
                      onClick={() =>
                        setExerciseSetsValue(exerciseSetsValue - 1)
                      }
                    />
                  </NumberInputStepper>
                </NumberInput>
              </>
            ) : (
              <Box />
            )}
            {currentExercise.reps ? (
              <Text fontSize={'3xl'} fontWeight={'bold'} pl={5}>
                Reps: {currentExercise.reps}
              </Text>
            ) : (
              <Box />
            )}
          </Flex>

          <Flex justifyContent={'space-between'}></Flex>
          <Box mt={3}>
            <Progress
              max={routine.exercises.length}
              value={currentExerciseListNumber}
              size="sm"
              colorScheme="brandPrimary"
            />
            <Flex w={'100%'} justifyContent={'space-between'} mt={2}>
              {currentExerciseIndex && currentExerciseIndex > 0 ? (
                <Button
                  variant={'outline'}
                  onClick={() => {
                    setCurrentExercise(
                      routine.exercises[Math.max(currentExerciseIndex - 1, 0)]
                    );
                  }}
                >
                  Previous
                </Button>
              ) : (
                <Box width={58}></Box>
              )}

              <Text>
                {currentExerciseListNumber}/{routine.exercises.length}
              </Text>
              {currentExerciseListNumber < routine.exercises.length ? (
                <Button
                  colorScheme={'brandPrimary'}
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
                  onClick={() => {
                    router.push('/');
                  }}
                >
                  Finish
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
