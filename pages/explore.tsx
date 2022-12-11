import useSWR from 'swr';
import Link from 'next/link';
import { Container } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout';
import { fetcher } from '../graphql/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { EQUIPMENT } from '../types/exercise';
import { getAllExercises } from '../providers/exercise.provider';

export default function Explore({
  exercises,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: userData, error: userError } = useSWR(
    '{me { name, routines { name, exercises { name, id, order } } } }',
    fetcher
  );

  if (userError) return <Container>Failed to load</Container>;
  if (!userData) return <Container>Loading...</Container>;

  return (
    <Layout home>
      <Container>
        <Text fontWeight="bold" fontSize="3xl">
          Filter by Exercise
        </Text>
        <List>
          {Object.values(EQUIPMENT).map((equipment) => (
            <ListItem key={equipment}>
              <Link href={`/exercises?equipment=${equipment}`}>
                {equipment}
              </Link>
            </ListItem>
          ))}
        </List>
      </Container>

      <Container>
        <Text fontSize="4xl">All Exercises</Text>
        {exercises?.map((exercise: ExerciseObject, i: number) => (
          <Container key={i}>
            <Link href={`/exercises/${exercise.id}`}>
              <Text>- {exercise.name}</Text>
              {exercise.instructions.length > 0 && (
                <Container>
                  {' '}
                  <Text fontSize="2xl">instructions: </Text>
                  <List>
                    {exercise.instructions.map((instruction) => (
                      <ListItem key={instruction.number}>
                        <Text as="b">{instruction.number}</Text>
                        <Text>{instruction.description}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Container>
              )}
            </Link>
          </Container>
        ))}
      </Container>
    </Layout>
  );
}
export async function getStaticProps() {
  const exercises = await getAllExercises();
  return {
    props: { exercises },
  };
}
