import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';

import '../styles/global.css';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
