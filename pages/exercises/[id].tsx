import Head from 'next/head';
import { Text } from '@chakra-ui/react';

import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import Layout from '../../components/layout';
import BasicExerciseInfo from '../../components/BasicExerciseInfo';
import { fullExercise } from '../../data/graphql/snippets/exercise';
import { ExerciseObject } from '../../types/exercise';

export default function Exercise(props: { exercise?: ExerciseObject }) {
  const { exercise } = props;

  if (!exercise) return <Text>Exercise not found</Text>;

  return (
    <Layout showReturnToHome={true}>
      <Head>
        <title>{exercise.name}</title>
      </Head>
      <article>
        <BasicExerciseInfo exercise={exercise} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const exerciseIds = await asyncFetch(`{ exercises { id } }`);
  const paths = exerciseIds.exercises.map((exercise: ExerciseObject) => ({
    params: {
      id: exercise.id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params: { id },
}: {
  params: { id: string };
}) {
  const exercise = await asyncFetch(
    `{ exercise(id:"${id}"){ ${fullExercise} } }`
  );

  return {
    props: exercise,
  };
}
