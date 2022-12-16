import Link from 'next/link';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text, useToast } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
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
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  const defaultExerciseListScrollEventCSS = ``;
  const fullyScrolledStyles = `
    border-bottom-right-radius:4px;
    border-top-right-radius:4px;
    border-right: 1px solid ${theme.colors.brandPrimary['300']};
  `;
  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const toast = useToast();
  const scrollRef = useRef();
  const { user } = useUser();
  const [exerciseListScrollEventCSS, setExerciseListScrollEventCSS] =
    useState<string>(defaultExerciseListScrollEventCSS); // [

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

  // TODO: type this event properly
  const handleScroll = ({ target }) => {
    const endOfScroll =
      target.scrollLeft + target.offsetWidth >= target.scrollWidth;

    if (exerciseListScrollEventCSS != fullyScrolledStyles && endOfScroll) {
      setExerciseListScrollEventCSS(fullyScrolledStyles);
    }
    if (
      exerciseListScrollEventCSS !== defaultExerciseListScrollEventCSS &&
      !endOfScroll
    ) {
      setExerciseListScrollEventCSS(defaultExerciseListScrollEventCSS);
    }
  };

  return (
    <Layout home>
      <Container mt={5}>
        <Text variant="h1" className={utilStyles.textOutline}>
          Your Routines
        </Text>
        <Box mt={3}>
          {currentUser?.routines.length > 0 ? (
            <List>
              {currentUser?.routines.map((routine: RoutineObject) => (
                <ListItem key={routine._id.toString()} mb="3">
                  <Flex
                    paddingX={2}
                    paddingY={1}
                    zIndex={2}
                    pos="relative"
                    borderTopRadius="md"
                    data-name="Routine name"
                    alignItems="center"
                    borderTop={'1px solid ' + theme.colors.brandPrimary['300']}
                    borderX={'1px solid ' + theme.colors.brandPrimary['300']}
                    display="inline-flex"
                    bgColor={theme.colors.brandPrimary['50']}
                    mb={-0.4}
                  >
                    <Text
                      textOverflow="ellipsis"
                      variant="h3"
                      className={utilStyles.textOutline}
                    >
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
                  <Box
                    pos="relative"
                    h="150px"
                    className={utilStyles.scrollTouch}
                    overflowX="auto"
                    ref={scrollRef}
                    onScroll={handleScroll}
                    overflowY="hidden"
                    bgColor={theme.colors.brandPrimary['50']}
                    data-name="Routine exercises"
                    // shadow="routineExercisesList"
                    borderLeft={'1px solid ' + theme.colors.brandPrimary['300']}
                    borderY={'1px solid ' + theme.colors.brandPrimary['300']}
                    borderBottom={
                      '1px solid ' + theme.colors.brandPrimary['300']
                    }
                    borderBottomLeftRadius={'md'}
                    css={exerciseListScrollEventCSS}
                  >
                    <Box pos="absolute" left="0" top="0" height="100%">
                      <Flex
                        flexDir="row"
                        data-name="Routine exercise list"
                        height="100%"
                      >
                        {routine.exercises.map((exercise) => (
                          <Box
                            key={exercise.id}
                            width="150px"
                            height="100%"
                            paddingY={'10px'}
                            paddingLeft={'10px'}
                            css={'&:last-of-type { padding-right: 10px; }'}
                          >
                            <Box
                              bgColor={theme.colors.cyan['50']}
                              height="100%"
                              p={2}
                              borderRadius="md"
                              outline={'1px solid ' + theme.colors.cyan['300']}
                            >
                              <Text variant="bold">{exercise.order}:</Text>{' '}
                              <Link href={`/exercises/${exercise.id}`}>
                                <Text
                                  fontSize="lg"
                                  color={theme.colors.blue['400']}
                                >
                                  {exercise.name}
                                </Text>
                              </Link>
                            </Box>
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  </Box>
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
            </List>
          ) : (
            <Flex flexWrap="wrap">
              <Text
                mb={'25'}
                fontStyle={'italic'}
                color={theme.colors.accent1['600']}
              >
                You have no routines yet
              </Text>
              <Link href="/new-routine">
                <Button
                  colorScheme="accent1"
                  paddingX={30}
                  paddingY={10}
                  variant="solid"
                  size="lg"
                  leftIcon={<AddIcon mr="5" />}
                >
                  <Flex
                    wrap="wrap"
                    justifyContent="center"
                    flexDir="column"
                    color={theme.colors.gray['50']}
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
