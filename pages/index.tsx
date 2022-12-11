import useSWR from 'swr';
import Link from 'next/link';
import { Container } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import { fetcher } from '../graphql/graphql-fetcher';
import { RoutineObject } from '../types/routine';

export default function Home() {
  const { data: userData, error: userError } = useSWR(
    '{me { name, routines { name, exercises { name, id, order } } } }',
    fetcher
  );

  if (userError) return <Container>Failed to load</Container>;
  if (!userData) return <Container>Loading...</Container>;

  return (
    <Layout home>
      <Container>
        <Text fontSize="4xl" as="b">
          Your Routines
        </Text>
        <List>
          {userData?.me?.routines.map((routine: RoutineObject) => (
            <ListItem key={routine.order}>
              <Text fontSize="2xl" as="b">
                {' '}
                {routine.name}
              </Text>
              <List>
                {routine.exercises.map((exercise) => (
                  <ListItem key={exercise.id}>
                    <Text as="b">{exercise.order}:</Text>{' '}
                    <Link href={`/exercises/${exercise.id}`}>
                      {exercise.name}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </ListItem>
          ))}
        </List>
      </Container>
    </Layout>
  );
}
