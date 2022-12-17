import {
  Alert,
  Box,
  Button,
  Flex,
  Input,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import { useUser } from '@auth0/nextjs-auth0/client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ObjectId } from 'bson';
import Layout from '../components/layout';
import { ExerciseObject } from '../types/exercise';
import { RoutineObject } from '../types/routine';
import {
  addExerciseToRoutine,
  removeExerciseFromRoutine,
} from '../providers/routine.provider';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import {
  saveRoutineMutationGraphQL,
  signInUserMutationQraphQL,
  SignInUserMutationResponse,
} from '../data/graphql/snippets/mutation';
import CurrentRoutineList from '../components/CurrentRoutineList';
import NoExercisesRoutineList from '../components/NoExercisesRoutineList';
import ExerciseSearchList from '../components/ExerciseSearchList';
import { getAllExercises } from '../providers/exercise.provider';
import { reorderList } from '../providers/list-helpers.provider';
import { useCurrentUserContext } from '../context/UserContext';
import { localStorageProvider } from '../providers/local-storage.provider';
import { theme } from '../styles/theme';

export default function NewRoutinePage() {
  const currentRoutineLocalStorageKey = 'currentRoutine';

  const router = useRouter();

  /** User */
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  // TODO: figure out how to make this trigger from context change
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      asyncFetch(signInUserMutationQraphQL, {
        input: { email: user.email },
      }).then((data: SignInUserMutationResponse) => {
        setCurrentUser(data.userSignIn.user);
      });
    }
  }, [user, setCurrentUser]);

  /** Routines */
  // TODO: is fetching larger data better in useEffect or getStaticProps?
  const [exercises, setExercises] = useState<ExerciseObject[]>([]);
  const routineSaveToast = useToast();

  const [currentRoutine, setCurrentRoutine] = useState<RoutineObject>({
    _id: new ObjectId(),
    userId: currentUser?._id ? new ObjectId(currentUser._id) : null,
    name: 'New Routine ' + '1',
    exercises: [],
    order: -1,
  });

  useEffect(() => {
    const routineFromLocalstorage = localStorageProvider.getItem<RoutineObject>(
      currentRoutineLocalStorageKey
    );
    if (routineFromLocalstorage) {
      setCurrentRoutine(routineFromLocalstorage);
    }
  }, []);

  useEffect(() => {
    localStorageProvider.setItem<RoutineObject>(
      currentRoutineLocalStorageKey,
      currentRoutine
    );
  }, [currentRoutine]);

  const handleSaveRoutine = async (routine) => {
    if (!routine.name || !routine.exercises.length) return;
    try {
      await asyncFetch(saveRoutineMutationGraphQL, { input: { routine } });
    } catch (error) {
      console.log('Error saving routine', { errorMessage: error.message });
      routineSaveToast({
        title: 'Something went wrong saving routine.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    localStorageProvider.removeItem(currentRoutineLocalStorageKey);

    routineSaveToast({
      title: 'Routine Saved.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    router.push('/');
  };
  const disableSaveButton =
    !currentRoutine.name || !currentRoutine.exercises.length;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newRoutine = {
      ...currentRoutine,
      exercises: reorderList(
        currentRoutine.exercises,
        result.source.index,
        result.destination.index
      ).map((exercise: ExerciseObject, index) => ({
        ...exercise,
        order: index,
      })),
    };

    setCurrentRoutine(newRoutine);
  };

  const handleRoutineNameChange = (event) => {
    setCurrentRoutine({ ...currentRoutine, name: event.target.value });
  };

  /** Exercises */
  const handleExerciseOnClick = (exercise: ExerciseObject) => {
    // Add new exercise to current routine and remove from search results
    const newRoutine: RoutineObject = addExerciseToRoutine(
      currentRoutine,
      exercise
    );
    setCurrentRoutine(newRoutine);
  };

  const handleRemoveExerciseFromRoutine = (exerciseId: string) => {
    const newRoutine: RoutineObject = removeExerciseFromRoutine(
      currentRoutine,
      exerciseId
    );
    setCurrentRoutine(newRoutine);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      const allExercises = await getAllExercises();
      setExercises(allExercises);
    };
    fetchExercises();
  }, []);

  return (
    <Layout home={false}>
      {!currentUser && (
        <Alert status="info" colorScheme="accent1" mb={3}>
          <InfoIcon color={theme.colors.accent1['900']} />
          <Text color={theme.colors.accent1['900']} ml={2} fontSize="md">
            Login to save your routine.
          </Text>
        </Alert>
      )}

      <Box pos="fixed" color={theme.colors.brandLight}></Box>
      <Box>
        <Flex mb={5}>
          <Input
            variant="outline"
            placeholder="New Routine"
            value={currentRoutine.name}
            onChange={handleRoutineNameChange}
            pl={0}
            fontSize="3xl"
          />
          {currentUser ? (
            <Button
              ml="4"
              p={5}
              colorScheme="brandSecondary"
              disabled={disableSaveButton}
              onClick={async () => await handleSaveRoutine(currentRoutine)}
            >
              <Text color={theme.colors.white} fontSize="lg">
                Save
              </Text>
            </Button>
          ) : (
            <Button ml="3" colorScheme="brandPrimary" size="lg">
              <Link href="/api/auth/login?returnTo=/new-routine">Login</Link>
            </Button>
          )}
        </Flex>
        {currentRoutine?.exercises.length > 0 ? (
          <Box maxHeight="35vh" minHeight="35vh" overflowY="auto" pr={1}>
            <CurrentRoutineList
              handleOnDragEnd={onDragEnd}
              currentRoutine={currentRoutine}
              handleRemoveExerciseFromRoutine={handleRemoveExerciseFromRoutine}
            />
          </Box>
        ) : (
          <Box maxHeight="35vh" minHeight="35vh" overflowY="auto">
            <NoExercisesRoutineList />
          </Box>
        )}
      </Box>
      <Box
        maxHeight={'35vh'}
        minHeight={'235px'}
        pr={1}
        mt={currentRoutine?.exercises.length > 4 ? 5 : 0}
      >
        <ExerciseSearchList
          allExercises={exercises}
          handleExerciseOnClick={handleExerciseOnClick}
        />
      </Box>
    </Layout>
  );
}
