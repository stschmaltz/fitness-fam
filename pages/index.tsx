import Link from 'next/link';
import { Box, Button, Container, Flex, Spinner } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import Image from 'next/image';
import { AddIcon } from '@chakra-ui/icons';
import orderBy from 'lodash/orderBy';

import Layout from '../components/layout';
import { RoutineObject } from '../types/routine';
import { theme } from '../styles/theme';
import RoutineScroller from '../components/RoutineScroller';
import BasicLoader from '../components/BasicLoader';
import { useUserSignIn } from '../hooks/use-user-sign-in.hook';
import EmptyState from '../components/HomePage/EmptyState';
import { useDeleteRoutine } from '../hooks/use-delete-routine';

export const siteTitle = 'FitnessFam.app';

export default function Home() {
  const [isLoading, currentUser, setCurrentUser] = useUserSignIn();
  const { deleteRoutine } = useDeleteRoutine();

  const handleDeleteRoutine = async (routineId: string): Promise<void> => {
    if (!currentUser || !setCurrentUser || !deleteRoutine) return;

    const result = await deleteRoutine({ routineId });

    if (result.deletedRoutineId) {
      setCurrentUser({
        ...currentUser,
        routines: currentUser?.routines.filter(
          (routine: RoutineObject) => routine._id.toString() !== routineId,
        ),
      });
    }
  };

  if (isLoading) <BasicLoader />;

  return (
    <Layout showReturnToHome={false}>
      <Box>
        <Image
          priority
          src="/images/profile.png"
          height={144}
          width={144}
          alt={siteTitle}
        />
      </Box>
      <Container pos="relative" mt={5} p={0} width="100%" maxW="inherit">
        <Flex
          justifyContent={'space-between'}
          alignItems={'center'}
          height="100%"
        >
          <Box></Box>
          {currentUser && currentUser.routines.length < 25 && (
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
          )}
        </Flex>
        <Box mt={3}>
          {!currentUser?.routines.length && isLoading && (
            <Spinner color="brandPrimary.500" />
          )}

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
                ),
              )}
            </List>
          ) : (
            !isLoading &&
            (!currentUser || currentUser?.routines.length === 0) && (
              <EmptyState />
            )
          )}
        </Box>

        {currentUser ? (
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
