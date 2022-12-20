import Link from 'next/link';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { AddIcon } from '@chakra-ui/icons';
import orderBy from 'lodash/orderBy';
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
import utilStyles from '../styles/utils.module.css';
import RoutineScroller from '../components/RoutineScroller';

export default function Home() {
  const { user } = useUser();
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      asyncFetch(signInUserMutationQraphQL, {
        input: { email: user.email },
      }).then((data: SignInUserMutationResponse) => {
        setCurrentUser && setCurrentUser(data.userSignIn.user);
      });
    }
  }, [user, setCurrentUser]);

  const handleDeleteRoutine = async (routineId: string): Promise<void> => {
    console.log('Deleting routine', { routineId });

    try {
      await asyncFetch(deleteRoutineMutationGraphQL, { input: { routineId } });

      setCurrentUser &&
        currentUser &&
        setCurrentUser({
          ...currentUser,
          routines: currentUser?.routines.filter(
            (routine: RoutineObject) => routine._id.toString() !== routineId
          ),
        });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      console.log('Error saving routine', { errorMessage });
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
      <Container pos="relative" mt={5} p={0} width="100%" maxW="inherit">
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          height="100%"
        >
          <Text
            height={'100%'}
            variant="h1"
            fontSize={'3xl'}
            className={utilStyles.textOutline}
            flexShrink={0}
          >
            Your Routines
          </Text>

          <Link href="/new-routine">
            <Button
              colorScheme={'brandSecondary'}
              size={'md'}
              aria-label="add routine"
              ml={3}
            >
              <Flex height={'100%'} alignItems="center">
                <AddIcon />
              </Flex>
            </Button>
          </Link>
        </Flex>
        <Box mt={3}>
          {currentUser?.routines.length && currentUser.routines.length > 0 ? (
            <List>
              {orderBy(currentUser.routines, '_id', 'desc').map(
                (routine: RoutineObject) => (
                  <ListItem key={routine._id.toString()} mb="3">
                    <RoutineScroller
                      handleDeleteRoutine={handleDeleteRoutine}
                      routine={routine}
                    />
                  </ListItem>
                )
              )}
            </List>
          ) : (
            <Flex flexWrap="wrap" flexDir={'column'}>
              <Text
                mb={'25'}
                fontStyle={'italic'}
                color={theme.colors.accent2['600']}
              >
                You have no routines yet
              </Text>
              <Link href="/new-routine">
                <Button
                  w={'100%'}
                  colorScheme="accent1"
                  paddingX={30}
                  paddingY={10}
                  variant="solid"
                  size="lg"
                  leftIcon={
                    <AddIcon color={theme.colors.accent2['400']} mr="5" />
                  }
                >
                  <Flex
                    wrap="wrap"
                    justifyContent="center"
                    flexDir="column"
                    color={theme.colors.accent2['400']}
                  >
                    <Text color="inherit">Click here to </Text>
                    <Text color="inherit">create a new routine </Text>
                  </Flex>
                </Button>
              </Link>
            </Flex>
          )}
        </Box>

        {user ? (
          <Box mt="2">
            <Link href="/api/auth/logout?returnTo=http%3A%2F%2Flocalhost%3A3000">
              Logout
            </Link>
          </Box>
        ) : (
          <Link href="/api/auth/login">
            <Button
              textColor={theme.colors.gray['100']}
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
