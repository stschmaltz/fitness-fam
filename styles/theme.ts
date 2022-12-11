import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: ('gray.100', 'grey.900'),
        color: 'gray.800',
      },
      // styles for the `a`
      a: {
        color: 'blue.400',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export { theme };
