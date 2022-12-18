import { createContext, ReactElement, useContext, useState } from 'react';
import { ApiUser } from '../data/graphql/snippets/user';

const CurrentUserContext = createContext<{
  currentUser?: ApiUser;
  setCurrentUser?: (currentUser: ApiUser | undefined) => void;
}>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
});

const useCurrentUserContext = () => useContext(CurrentUserContext);
const CurrentUserProvider = (input: { children: ReactElement | null }) => {
  const { children } = input;
  const [currentUser, setCurrentUser] = useState<ApiUser | undefined>(
    undefined
  );

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext, useCurrentUserContext };
