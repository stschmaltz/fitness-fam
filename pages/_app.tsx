import { ChakraProvider } from '@chakra-ui/react';
import '../styles/global.css';
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
