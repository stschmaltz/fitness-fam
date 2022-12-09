import useSWR from 'swr';

import Layout from '../components/layout.js';
import utilStyles from '../styles/utils.module.css';
import { fetcher } from '../lib/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { allExercisesQuery } from '../graphql/exercises';
import { RoutineObject } from '../types/routine.js';
import Link from 'next/link.js';

// TODO: clean up queries
export default function Home() {
  const { data: allExercises, error: allExercisesError } = useSWR(
    allExercisesQuery,
    fetcher
  );
  const { data: userData, error: userError } = useSWR(
    '{me { name, routines { name, exercises { name, id, order } } } }',
    fetcher
  );

  console.log(userData);
  if (allExercisesError || userError) return <div>Failed to load</div>;
  if (!allExercises || !userData) return <div>Loading...</div>;

  const { exercises } = allExercises;
  return (
    <Layout home>
      <div>
        <h2>Your Routines</h2>
        <ul>
          {userData?.me?.routines.map((routine: RoutineObject) => (
            <li key={routine.order}>
              <h4> {routine.name}</h4>
              <ul>
                {routine.exercises.map((exercise) => (
                  <li key={exercise.id}>
                    <b>{exercise.order}:</b>{' '}
                    <Link href={`/exercises/${exercise.id}`}>
                      {exercise.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>All Exercises</h3>
        {exercises?.map((exercise: ExerciseObject, i: number) => (
          <div key={i}>
            <Link href={`/exercises/${exercise.id}`}>
              <span>- {exercise.name}</span>
              {exercise.instructions.length > 0 && (
                <>
                  {' '}
                  <h3>instructions: </h3>
                  <ul className={utilStyles.list}>
                    {exercise.instructions.map((instruction) => (
                      <li key={instruction.number}>
                        <h1>{instruction.number}</h1>
                        <span>{instruction.description}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
