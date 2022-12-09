import Image from 'next/image';
import Layout from '../../components/layout.js';
import Head from 'next/head';
import utilStyles from '../../styles/utils.module.css';
import { asyncFetch } from '../../lib/graphql-fetcher';
import { ExerciseObject } from '../../types/exercise';
import { fullExercise } from '../../graphql/exercises';

export default function Exercise({ exercise }: { exercise: ExerciseObject }) {
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
                {exercise.instructions.map((instruction) => (
                  <span key={instruction.number}>
                    {instruction.description}
                  </span>
                ))}
              </li>
            )}
          </ul>
        </div>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const exerciseIds = await asyncFetch(`{ exercises { id } }`);
  const paths = exerciseIds.exercises.map((exercise) => ({
    params: {
      id: exercise.id,
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  const exercise = await asyncFetch(
    `{ exercise(id:"${params.id}"){ ${fullExercise} } }`
  );
  console.log(exercise);

  return {
    props: exercise,
  };
}
