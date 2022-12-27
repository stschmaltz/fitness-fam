import Head from 'next/head';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { Spinner, Text } from '@chakra-ui/react';

import { fetcher } from '../../data/graphql/graphql-fetcher';
import Layout from '../../components/layout';
import BasicExerciseInfo from '../../components/BasicExerciseInfo';
import { queryExerciseById } from '../../data/graphql/snippets/exercise';

export default function Exercise() {
  const router = useRouter();

  const { data, error } = useSWR(
    queryExerciseById(router?.query.id as string),
    fetcher
  );

  if (error) return <Text>Failed to load</Text>;
  if (!data)
    return (
      <Text>
        <Spinner size={'xl'} />
      </Text>
    );

  if (!data.exercise) return <Text>Exercise not found</Text>;

  const { exercise } = data;

  return (
    <Layout home={false}>
      <Head>
        <title>{exercise.name}</title>
      </Head>
      <article>
        <BasicExerciseInfo exercise={exercise} />
      </article>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const exerciseIds = await asyncFetch(`{ exercises { id } }`);
//   const paths = exerciseIds.exercises.map((exercise) => ({
//     params: {
//       id: exercise.id,
//     },
//   }));
//   console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   console.log(params);
//   const exercise = await asyncFetch(
//     `{ exercise(id:"${params.id}"){ ${fullExercise} } }`
//   );
//   console.log(exercise);

//   return {
//     props: exercise,Fc
//   };
// }
