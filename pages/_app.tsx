import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Analytics } from '@vercel/analytics/react';

import '../styles/global.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { theme } from '../styles/theme';
import { CurrentUserProvider } from '../context/UserContext';
import { usePWASetup } from '../hooks/use-pwa-setup.hook';

const customIcons = {
  shoulders: {
    viewBox: '0 0 1200 1200',

    path: (
      <path
        fill="currentColor"
        d="m349.97 918.55c-7.3008 0.9375-12.621 7.3789-12.16 14.727 0.45703 7.3477 6.5391 13.078 13.902 13.098h202.84c8.875-0.003906 17.574-2.4883 25.113-7.1719 7.543-4.6836 13.625-11.383 17.559-19.336 7.4023-14.957 8.5508-32.242 3.1914-48.047-5.3594-15.801-16.781-28.824-31.754-36.195-0.88281-56.254 4.7148-112.42 16.676-167.4 22.84-25.09 38.398-55.938 45-89.215 6.6055-33.281 4-67.73-7.5273-99.641-0.98047-2.7109-0.41406-5.7383 1.4805-7.9141 1.8945-2.1719 4.8164-3.1484 7.6367-2.5508 77.23 16.328 157.7 6.3789 228.63-28.266 4.8789-36.523-1.0156-73.68-16.965-106.9-15.945-33.223-41.25-61.059-72.801-80.098-96.562-0.41016-191.39 25.66-274.17 75.379-22.398 13.457-36.738 37.074-38.348 63.156-8.8281 142.84-1.7422 286.22 21.125 427.5 1.5977 9.8477-0.90625 19.922-6.9297 27.879-14.676 19.387-33.074 35.648-54.113 47.84-21.039 12.191-44.297 20.066-68.414 23.16z"
      />
    ),
  },
};
const customTheme = {
  ...theme,
  icons: {
    ...theme.icons,
    ...customIcons,
  },
};
export default function App({ Component, pageProps }: AppProps) {
  usePWASetup();
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <UserProvider user={pageProps.user}>
        <ChakraProvider theme={customTheme}>
          <CurrentUserProvider>
            <Component {...pageProps} />
          </CurrentUserProvider>
        </ChakraProvider>
      </UserProvider>
      <Analytics />
    </>
  );
}
