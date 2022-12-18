import Link from 'next/link';
import { Container } from '@chakra-ui/react';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import { InferGetStaticPropsType } from 'next';
import Layout from '../components/layout';
import { ExerciseObject } from '../types/exercise';
import { EQUIPMENT } from '../types/exercise';
import { appContainer } from '../container/inversify.config';
import { ExerciseProviderInterface } from '../providers/exercise.provider/exercise.provider.interface';
import { TYPES } from '../container/types';

export default function ExplorePage({
  exercises,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout home>
      <Container>
        <Text variant="h1">Filter by Exercise</Text>
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
        <Text variant="h1">All Exercises</Text>
        {exercises?.map((exercise: ExerciseObject, i: number) => (
          <Container key={i}>
            <Link href={`/exercises/${exercise.id}`}>
              <Text>- {exercise.name}</Text>
              {exercise.instructions.length > 0 && (
                <Container>
                  {' '}
                  <Text variant="h3">instructions: </Text>
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
  const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
    TYPES.ExerciseProvider
  );

  const exercises = await exerciseProvider.getAllExercises();

  return {
    props: { exercises },
  };
}
