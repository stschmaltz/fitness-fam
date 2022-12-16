import { extendTheme } from '@chakra-ui/react';

const brandPrimary = '#FA897B';
const brandLight = '#FFEDDF';
const firstAccent = '#D0E6A5';
const secondAccent = '#CCABD8';
const thirdAccent = '#7AE0C9';
const brandSecondary = '#FFDD94';

const colors = {
  backgroundColor: '#F3F7F8',
  brandPrimary,
  brandLight,
  brandSecondary,
  firstAccent,
  secondAccent,
  thirdAccent,
  brandPrimaryColors: {
    '50': brandLight,
    '100': '#FFBBAD',
    '200': '#FFA799',
    '300': '#FF9D8F',
    '400': '#FF9385',
    '500': brandPrimary,
    '600': '#F07F71',
    '700': '#E67567',
    '800': '#DC6B5D',
    '900': '#D26153',
  },
  brandSecondaryColors: {
    '50': '#FFFFD0',
    '100': '#FFFFC6',
    '200': '#FFFFBC',
    '300': '#FFFBB2',
    '400': '#FFF1A8',
    '500': '#FFE79E',
    '600': brandSecondary,
    '700': '#F5D38A',
    '800': '#EBC980',
    '900': '#D7B56C',
  },
  accent1: {
    '50': '#FFFFD7',
    '100': '#F8FFCD',
    '200': '#E4FAB9',
    '300': '#DAF0AF',
    '400': '#D0E6A5',
    '500': '#C6DC9B',
    '600': '#BCD291',
    '700': '#B2C887',
    '800': '#A8BE7D',
    '900': '#9EB473',
  },
  accent2: {
    '50': '#F4D3FF',
    '100': '#EAC9F6',
    '200': '#E0BFEC',
    '300': '#CCABD8',
    '400': '#C2A1CE',
    '500': '#B897C4',
    '600': '#AE8DBA',
    '700': '#A483B0',
    '800': '#9A79A6',
    '900': '#906F9C',
  },
  accent3: {
    '50': '#A2FFF1',
    '100': '#98FEE7',
    '200': '#8EF4DD',
    '300': '#84EAD3',
    '400': '#7AE0C9',
    '500': '#70D6BF',
    '600': '#5CC2AB',
    '700': '#52B8A1',
    '800': '#48AE97',
    '900': '#3EA48D',
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    Text: {
      baseStyle: {
        color: 'gray.800',
        fontSize: '2xl',
      },
      variants: {
        bold: {
          fontWeight: 'bold',
          m: 0,
          display: 'inline-block',
        },
        h1: {
          color: colors.brandPrimary,
          fontWeight: 'bold',
          fontSize: '4xl',
        },
        h2: {
          color: colors.brandSecondary,
          fontWeight: 'bold',
          fontSize: '3xl',
        },
        h3: {
          color: colors.brandSecondary,
          fontWeight: 'bold',
          fontSize: '2xl',
        },
      },
    },
  },
  colors: {
    transparent: 'transparent',
    lightShade: '#F3F7F8',
    primary: colors.brandPrimary,
    secondary: colors.brandSecondary,
    firstAccent: colors.firstAccent,
    secondAccent: colors.secondAccent,
    thirdAccent: colors.thirdAccent,

    brandPrimary: colors.brandPrimaryColors,
    brandSecondary: colors.brandSecondaryColors,
    accent1: colors.accent1,
    accent2: colors.accent2,
    accent3: colors.accent3,

    green: colors.accent1,
    yellow: colors.brandSecondaryColors,
    red: colors.brandPrimaryColors,
    purple: colors.accent2,
    teal: colors.accent3,
  },

  styles: {
    global: {
      body: {
        bg: colors.backgroundColor,
        p: 0,
        m: 0,
        lineHeight: 1.6,
      },

      a: {
        fontSize: 'xl',
        color: 'cyan.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export { theme, brandPrimary };
