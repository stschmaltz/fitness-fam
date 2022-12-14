import Link from 'next/link';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import Layout from '../components/layout';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import { RoutineObject } from '../types/routine';
import {
  deleteRoutineMutationGraphQL,
  signInUserMutationQraphQL,
  SignInUserMutationResponse,
} from '../data/graphql/snippets/mutation';
import { useCurrentUserContext } from '../context/UserContext';
import { theme } from '../styles/theme';
import style from '../styles/utils.module.css';

export default function Home() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const toast = useToast();

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

  const handleDeleteRoutine = async (routineId: string) => {
    console.log('Deleting routine', { routineId });

    try {
      await asyncFetch(deleteRoutineMutationGraphQL, { input: { routineId } });

      setCurrentUser({
        ...currentUser,
        routines: currentUser.routines.filter(
          (routine: RoutineObject) => routine._id.toString() !== routineId
        ),
      });
    } catch (error) {
      console.log('Error saving routine', { errorMessage: error.message });
      toast({
        title: 'Something went wrong saving routine.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout home>
      <Container
        mt={5}
        display={'flex'}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Text variant="h1" className={style.textOutline}>
          Your Routines
        </Text>
        <List mt={5}>
          {currentUser?.routines.length > 0 ? (
            <Box>
              {currentUser?.routines.map((routine: RoutineObject) => (
                <ListItem key={routine._id.toString()}>
                  <Flex alignItems="center">
                    <Text variant="h3" className={style.textOutline}>
                      {' '}
                      {routine.name}
                    </Text>
                    <DeleteIcon
                      color={theme.colors.primary}
                      ml={3}
                      onClick={async () =>
                        await handleDeleteRoutine(routine._id.toString())
                      }
                    />
                  </Flex>
                  <List>
                    {routine.exercises.map((exercise) => (
                      <ListItem key={exercise.id}>
                        <Text variant="bold">{exercise.order}:</Text>{' '}
                        <Link href={`/exercises/${exercise.id}`}>
                          {exercise.name}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              ))}
              <Box mt={10}>
                <Link color={theme.colors.brandPrimary} href="/new-routine">
                  <Flex alignItems="center">
                    <AddIcon color={theme.colors.brandPrimary} />{' '}
                    <Text color={theme.colors.brandPrimary}>
                      Add new Routine
                    </Text>
                  </Flex>
                </Link>
              </Box>
            </Box>
          ) : (
            <Flex justifyContent={'center'} flexWrap="wrap">
              <Text
                mb={'25'}
                fontStyle={'italic'}
                color={theme.colors.accent3['300']}
              >
                You have no routines yet
              </Text>
              <Link href="/new-routine">
                <Button
                  colorScheme="accent1"
                  p={30}
                  variant="outline"
                  size="lg"
                  leftIcon={<AddIcon mr="5" />}
                >
                  <Flex wrap="wrap" justifyContent="center" flexDir="column">
                    <Text color={theme.colors.accent1['500']}>
                      Click here to{' '}
                    </Text>
                    <Text color={theme.colors.accent1['500']}>
                      create a new routine{' '}
                    </Text>
                  </Flex>
                </Button>
              </Link>
            </Flex>
          )}
        </List>

        {user ? (
          <Box mt="5rem">
            <Link href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost%3A3000">
              Logout
            </Link>
          </Box>
        ) : (
          <Link href="/api/auth/login">
            <Button
              textColor={theme.colors.gray['50']}
              colorScheme="brandPrimary"
              mt="10rem"
              p={5}
            >
              Login
            </Button>
          </Link>
        )}
      </Container>
    </Layout>
  );
}
