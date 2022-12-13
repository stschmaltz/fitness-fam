import { extendTheme } from '@chakra-ui/react';

const brandPrimary = '#53be82';
const brandLight = '#ECF8F2';
const firstAccent = '#b13d55';
const secondAccent = '#5099AF';
const thirdAccent = '#71808E';
const brandSecondary = '#D38B2C';

const colors = {
  backgroundColor: '#F3F7F8',
  brandPrimary: brandPrimary,
  brandLight: brandLight,
  secondAccent,
  firstAccent,
  thirdAccent,
  brandSecondary,
  brandPrimaryColors: {
    '50': brandLight,
    '100': '#CBEBD9',
    '200': '#AADFC1',
    '300': '#89D2A9',
    '400': '#67C691',
    '500': brandPrimary,
    '600': '#389460',
    '700': '#2A6F48',
    '800': '#1C4A30',
    '900': '#0E2518',
  },
  brandSecondaryColors: {
    '50': '#FBF3EA',
    '100': '#F3DFC4',
    '200': '#EBCA9E',
    '300': '#E3B578',
    '400': '#DBA052',
    '500': brandSecondary,
    '600': '#A96F23',
    '700': '#7F531A',
    '800': '#543812',
    '900': '#2A1C09',
  },
  accent1: {
    '50': '#F8ECEF',
    '100': '#EDCAD2',
    '200': '#E1A8B5',
    '300': '#D58698',
    '400': '#C9647B',
    '500': firstAccent,
    '600': '#97354B',
    '700': '#712838',
    '800': '#4C1A26',
    '900': '#260D13',
  },
  accent2: {
    '50': '#EEF5F7',
    '100': '#CEE2E8',
    '200': '#AFD0DA',
    '300': '#8FBECC',
    '400': '#70ABBD',
    '500': '#5099AF',
    '600': '#407A8C',
    '700': '#305C69',
    '800': '#203D46',
    '900': '#101F23',
  },
  accent3: {
    '50': '#F1F2F4',
    '100': '#D7DBDF',
    '200': '#BEC5CB',
    '300': '#A4AEB7',
    '400': '#8A97A3',
    '500': '#71808E',
    '600': '#5A6672',
    '700': '#444D55',
    '800': '#2D3339',
    '900': '#171A1C',
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

    green: colors.brandPrimaryColors,
    yellow: colors.brandSecondaryColors,
    red: colors.accent1,
    teal: colors.accent2,
    gray: colors.accent3,
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
        color: 'blue.200',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export { theme, brandPrimary };
