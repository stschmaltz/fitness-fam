import useSWR from 'swr';

import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout.js';
import { getSortedPostsData } from '../lib/posts';
import { fetcher } from '../lib/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { allExercisesQuery } from '../graphql/exercises';

export default function Home({ allPostsData }) {
  // const { data, error } = useSWR("{ users { name } }", fetcher);

  const { data, error } = useSWR(allExercisesQuery, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { exercises } = data;
  return (
    <Layout home>
      {exercises?.map((exercise: ExerciseObject, i: number) => (
        <div key={i}>
          <span>- {exercise.name}</span>
          {exercise.instructions.length > 0 && (
            <>
              {' '}
              <h3>instructions: </h3>
              <ul>
                {exercise.instructions.map((instruction) => (
                  <li key={instruction.number}>
                    <h1>{instruction.number}</h1>
                    <span>{instruction.description}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
      <Head>
        <title>{siteTitle}</title>
      </Head>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
