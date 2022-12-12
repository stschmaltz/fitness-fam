import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

import '../styles/global.css';
import { theme } from '../styles/theme';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
