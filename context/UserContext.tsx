import { createContext, useContext, useState } from 'react';
import { ApiUser } from '../data/graphql/snippets/user';

const CurrentUserContext = createContext<{
  currentUser?: ApiUser;
  setCurrentUser?: (currentUser) => void;
}>({
  currentUser: undefined,
  setCurrentUser: () => undefined,
});

const useCurrentUserContext = () => useContext(CurrentUserContext);
const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ApiUser>(undefined);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserProvider, CurrentUserContext, useCurrentUserContext };
