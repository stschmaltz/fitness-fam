import useSWR from 'swr';
import { Container } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text } from '@chakra-ui/react';

import Layout from '../components/layout';
import { fetcher } from '../graphql/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { fullExercise } from '../graphql/exercises';

export default function ExercisesPage() {
  const {
    query: { equipment },
  } = useRouter();

  const { data, error } = useSWR(
    `{ exercisesByEquipment(equipment: "${equipment}") { ${fullExercise} } }`,
    fetcher
  );

  if (error) return <Container>Failed to load</Container>;
  if (!data) return <Container>Loading...</Container>;

  const { exercisesByEquipment } = data;

  return (
    <Layout home={false}>
      <Container>
        <Text variant="h1">Exercises: {equipment}</Text>
        Total: {exercisesByEquipment?.length}
        {exercisesByEquipment?.map((exercise: ExerciseObject, i: number) => (
          <Container key={i}>
            <Link href={`/exercises/${exercise.id}`}>
              <Text>
                - {exercise.name} ({exercise.bodyPart})
              </Text>
            </Link>
          </Container>
        ))}
      </Container>
    </Layout>
  );
}
