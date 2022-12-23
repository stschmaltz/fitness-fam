import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import { useCurrentUserContext } from '../context/UserContext';
import { asyncFetch } from '../data/graphql/graphql-fetcher';
import {
  signInUserMutationGraphQL,
  SignInUserMutationResponse,
} from '../data/graphql/snippets/mutation';
import { ApiUser } from '../data/graphql/snippets/user';

function useUserSignIn(): readonly [
  boolean,
  ApiUser | undefined,
  ((currentUser: ApiUser | undefined) => void) | undefined
] {
  const { user, isLoading } = useUser();

  const { currentUser, setCurrentUser } = useCurrentUserContext();
  const [isLoadingRoutines, setIsLoadingRoutines] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoadingRoutines(true);
      asyncFetch(signInUserMutationGraphQL, {
        input: { email: user.email },
      }).then((data: SignInUserMutationResponse) => {
        setCurrentUser && setCurrentUser(data.userSignIn.user);
        setIsLoadingRoutines(false);
      });
    } else {
      setIsLoadingRoutines(false);
    }
  }, [user, setCurrentUser]);

  return [isLoading || isLoadingRoutines, currentUser, setCurrentUser] as const;
}

export { useUserSignIn };
