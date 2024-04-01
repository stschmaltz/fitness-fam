import Head from 'next/head';
import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

// import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import { useEffect, useState } from 'react';
import Layout from '../../components/layout';
import BasicExerciseInfo from '../../components/BasicExerciseInfo';
// import { fullExercise } from '../../data/graphql/snippets/exercise';
import { ExerciseObject } from '../../types/exercise';
import { appContainer } from '../../container/inversify.config';
import { ExerciseProviderInterface } from '../../providers/exercise.provider/exercise.provider.interface';
import { TYPES } from '../../container/types';

export default function Exercise(props: { exercise?: ExerciseObject }) {
  const { exercise } = props;
  const router = useRouter();
  const supersetExerciseId = router.query?.supersetId as string | undefined;
  const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
    TYPES.ExerciseProvider
  );

  const [supersetExercise, setSupersetExercise] =
    useState<ExerciseObject | null>();

  useEffect(() => {
    if (!supersetExerciseId) return;

    const getSupersetExercise = async () => {
      const supersetExercise = await exerciseProvider.findExerciseById(
        supersetExerciseId
      );

      setSupersetExercise(supersetExercise);
    };

    getSupersetExercise().catch((err) => {
      console.log(err);
    });
  }, [supersetExerciseId, exerciseProvider, setSupersetExercise]);

  if (!exercise) return <Text>Exercise not found</Text>;

  return (
    <Layout showReturnToHome={true}>
      <Head>
        <title>{exercise.name}</title>
      </Head>
      <article>
        <BasicExerciseInfo
          exercise={exercise}
          supersetExercise={supersetExercise}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
    TYPES.ExerciseProvider
  );
  const exercises = await exerciseProvider.getAllExercises();

  const paths = exercises.map((exercise: ExerciseObject) => ({
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
  const exerciseProvider = appContainer.get<ExerciseProviderInterface>(
    TYPES.ExerciseProvider
  );
  const exercise = await exerciseProvider.findExerciseById(id);

  return {
    props: { exercise },
  };
}
