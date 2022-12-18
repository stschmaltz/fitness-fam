import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import '../styles/global.css';
import { AppProps } from 'next/app';
import { theme } from '../styles/theme';
import { CurrentUserProvider } from '../context/UserContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <CurrentUserProvider>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </ChakraProvider>
    </UserProvider>
  );
}
