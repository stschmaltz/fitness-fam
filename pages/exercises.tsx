import useSWR from 'swr';

import Layout from '../components/layout.js';
import { fetcher } from '../lib/graphql-fetcher';
import { ExerciseObject } from '../types/exercise';
import { fullExercise } from '../graphql/exercises';
import Link from 'next/link';
import { useRouter } from 'next/router.js';

export default function Exercises() {
  const {
    query: { equipment },
  } = useRouter();
  console.log('bow wow ' + JSON.stringify(equipment));

  const { data, error } = useSWR(
    `{ exercisesByEquipment(equipment: "${equipment}") { ${fullExercise} } }`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { exercisesByEquipment } = data;

  console.log('yip ' + exercisesByEquipment);
  return (
    <Layout home={false}>
      <div>
        <h3>Exercises: {equipment}</h3>
        Total: {exercisesByEquipment?.length}
        {exercisesByEquipment?.map((exercise: ExerciseObject, i: number) => (
          <div key={i}>
            <Link href={`/exercises/${exercise.id}`}>
              <span>
                - {exercise.name} ({exercise.bodyPart})
              </span>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
}
