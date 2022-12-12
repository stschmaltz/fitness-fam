import Link from 'next/link';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import { AddIcon } from '@chakra-ui/icons';
import { useUser } from '@auth0/nextjs-auth0/client';
import Layout from '../components/layout';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import { RoutineObject } from '../types/routine';
import {
  signInUserMutationQraphQL,
  SignInUserMutationReponse,
} from '../data/graphql/snippets/mutation';
import { useCurrentUserContext } from '../context/UserContext';
import { theme } from '../styles/theme';

export default function Home() {
  const { currentUser, setCurrentUser } = useCurrentUserContext();

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      asyncFetch(signInUserMutationQraphQL, {
        input: { email: user.email },
      }).then((data: SignInUserMutationReponse) => {
        setCurrentUser(data.userSignIn.user);
      });
    }
  }, [user, setCurrentUser]);

  return (
    <Layout home>
      <Container
        mt={5}
        display={'flex'}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Text variant="h1">Your Routines</Text>
        <List mt={5}>
          {currentUser?.routines.length > 0 ? (
            <Box>
              {currentUser?.routines.map((routine: RoutineObject) => (
                <ListItem key={routine._id.toString()}>
                  <Text variant="h3"> {routine.name}</Text>
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
                <Link color={theme.colors.brand} href="/new-routine">
                  <Flex alignItems="center">
                    <AddIcon color={theme.colors.brand} />{' '}
                    <Text color={theme.colors.brand}>Add new Routine</Text>
                  </Flex>
                </Link>
              </Box>
            </Box>
          ) : (
            <Flex justifyContent={'center'} flexWrap="wrap">
              <Text mb={'25'}>You have no routines yet</Text>
              <Link href="/new-routine">
                <Button size="lg" leftIcon={<AddIcon mr="5" />}>
                  <Flex wrap="wrap" justifyContent="center">
                    <Text>Click here to</Text>
                    <Text>create a new routine </Text>
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
          <Button mt="10rem" p={8}>
            <Box>
              <Text>Not signed in</Text>
              <Link href="/api/auth/login">Login</Link>
            </Box>
          </Button>
        )}
      </Container>
    </Layout>
  );
}
