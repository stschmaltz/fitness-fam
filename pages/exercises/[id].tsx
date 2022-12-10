import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { useRouter } from 'next/router.js';
import { List, ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

import { fullExercise } from '../../graphql/exercises';
import { fetcher } from '../../graphql/graphql-fetcher';
import Layout from '../../components/layout.js';

export default function Exercise() {
  const {
    query: { id: exerciseId },
  } = useRouter();

  const { data, error } = useSWR(
    `{ exercise(id:"${exerciseId}"){ ${fullExercise} } }`,
    fetcher
  );

  if (error) return <Text>Failed to load</Text>;
  if (!data) return <Text>Loading...</Text>;

  const { exercise } = data;
  return (
    <Layout home={undefined}>
      <Head>
        <title>{exercise.name}</title>
      </Head>
      <article>
        <Text fontSize="3xl">{exercise.name}</Text>
        <Container>
          <List>
            <ListItem>
              <Text as="b">Id:</Text> {exercise.id}
            </ListItem>
            <ListItem>
              {' '}
              <Text as="b">Body Part:</Text> {exercise.bodyPart}
            </ListItem>
            <ListItem>
              {' '}
              <Text as="b">Equipment:</Text> {exercise.equipment}
            </ListItem>
            <ListItem>
              {' '}
              <Text as="b">Target:</Text> {exercise.target}
            </ListItem>
            <ListItem>
              <Container>
                <Image
                  src={exercise.gifUrl}
                  alt="my gif"
                  width={360}
                  height={360}
                />
              </Container>
              {}
            </ListItem>
            {exercise.instructions.length > 1 && (
              <ListItem>
                <Text as="b">Instructions</Text>
                <List>
                  {exercise.instructions.map((instruction) => (
                    <ListItem key={instruction.number}>
                      {instruction.description}
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            )}
          </List>
        </Container>
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
