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
        <Text variant="h1">Your Routines</Text>
        <List>
          {userData?.me?.routines.map((routine: RoutineObject) => (
            <ListItem key={routine.order}>
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
        </List>
      </Container>
    </Layout>
  );
}
