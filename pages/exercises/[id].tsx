import Image from 'next/image';
import Layout from '../../components/layout.js';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import { fetcher } from '../../lib/graphql-fetcher';
import useSWR from 'swr';
import { fullExercise } from '../../graphql/exercises';
import { useRouter } from 'next/router.js';

export default function Exercise() {
  const {
    query: { id: exerciseId },
  } = useRouter();

  const { data, error } = useSWR(
    `{ exercise(id:"${exerciseId}"){ ${fullExercise} } }`,
    fetcher
  );

  console.log(data);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { exercise } = data;
  return (
    <Layout home={undefined}>
      <Head>
        <title>{exercise.id}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{exercise.name}</h1>
        <div>
          <ul className={utilStyles.list}>
            <li>
              <b>Id:</b> {exercise.id}
            </li>
            <li>
              {' '}
              <b>Body Part:</b> {exercise.bodyPart}
            </li>
            <li>
              {' '}
              <b>Equipment:</b> {exercise.equipment}
            </li>
            <li>
              {' '}
              <b>Target:</b> {exercise.target}
            </li>
            <li>
              <div>
                <Image
                  src={exercise.gifUrl}
                  alt="my gif"
                  width={360}
                  height={360}
                />
              </div>
              {}
            </li>
            {exercise.instructions.length > 1 && (
              <li>
                <b>Instructions</b>
                <ul>
                  {exercise.instructions.map((instruction) => (
                    <li key={instruction.number}>{instruction.description}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
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
//     props: exercise,
//   };
// }
