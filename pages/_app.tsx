import { ChakraProvider } from '@chakra-ui/react';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
