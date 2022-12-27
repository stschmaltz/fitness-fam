import useSWR from 'swr';
import { Container, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import { fetcher } from '../data/graphql/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { exercisesByEquipmentQuery } from '../data/graphql/snippets/exercise';

export default function ExercisesPage() {
  const {
    query: { equipment },
  } = useRouter();

  // TODO: add equipment array support
  const { data, error } = useSWR(
    exercisesByEquipmentQuery(equipment as string),
    fetcher
  );

  if (error) return <Container>Failed to load</Container>;
  if (!data)
    return (
      <Container>
        <Spinner size={'xl'} />
      </Container>
    );

  const { exercisesByEquipment } = data;

  return (
    <Layout showReturnToHome={true}>
      <Container>
        <Text variant="h1">Exercises: {equipment}</Text>
        Total: {exercisesByEquipment?.length}
        {exercisesByEquipment?.map((exercise: ExerciseObject) => (
          <Container key={exercise.id}>
            <Link href={`/exercises/${exercise.id}`}>
              <Text>
                - {exercise.name} ({exercise.bodyArea})
              </Text>
            </Link>
          </Container>
        ))}
      </Container>
    </Layout>
  );
}
