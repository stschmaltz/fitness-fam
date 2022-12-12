import useSWR from 'swr';
import Link from 'next/link';
import { Button, Container, Flex, IconButton } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';
import Layout from '../components/layout';
import { fetcher } from '../data/graphql/graphql-fetcher';
import { RoutineObject } from '../types/routine';
import { baseUserQuery } from '../data/graphql/snippets/user';

export default function Home() {
  const { data: userData, error: userError } = useSWR(baseUserQuery, fetcher);

  if (userError) return <Container>Failed to load</Container>;
  if (!userData) return <Container>Loading...</Container>;
  console.log(userData?.me?.routines);
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
          {userData?.me?.routines.length > 0 ? (
            userData?.me?.routines.map((routine: RoutineObject) => (
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
            ))
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
        <Link href="/new-routine">
          <IconButton
            mt={'10'}
            aria-label="create new routine"
            icon={<AddIcon />}
          ></IconButton>
        </Link>
      </Container>
    </Layout>
  );
}
