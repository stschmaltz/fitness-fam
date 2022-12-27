import { useRouter } from 'next/router';

import Layout from '../../components/layout';
import { asyncFetch } from '../../data/graphql/graphql-fetcher';
import BasicLoader from '../../components/BasicLoader';
import { fullRoutine } from '../../data/graphql/snippets/routine';
import { useUserSignIn } from '../../hooks/use-user-sign-in.hook';
import { RoutineObject } from '../../types/routine';

export default function EditRoutinePage(props: { routine?: RoutineObject }) {
  const { routine } = props;
  const router = useRouter();
  const test = router.query;

  console.log(test);

  const [isLoading, currentUser, _setCurrentUser] = useUserSignIn();

  if (isLoading) return <BasicLoader />;

  if (!currentUser) {
    return (
      // TODO: real 401 page
      <Layout home={false}>
        <div>401: Not Authorized</div>
      </Layout>
    );
  }

  if (!routine) {
    // TODO: real 404 page
    return (
      <Layout home={false}>
        <div>404: Routine not found</div>
      </Layout>
    );
  }

  return <Layout home={false}>{JSON.stringify(routine)}</Layout>;
}

export const getServerSideProps = async ({
  query,
}: {
  query: { id: string };
}) => {
  try {
    const routine = await asyncFetch(
      `{ routine(id:"${query.id}"){ ${fullRoutine} } }`
    );

    return {
      props: routine,
    };
  } catch (error) {
    console.log('error', error);

    return {
      props: {},
    };
  }
};
