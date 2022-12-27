import { extendTheme } from '@chakra-ui/react';

const brandPrimary = '#E63946';
const brandLight = '#FFdddd';
const firstAccent = '#a8dadc';
const secondAccent = '#1D3557';
const thirdAccent = '#EB603E';
const brandSecondary = '#457b9d';

const colors = {
  backgroundColor: '#FBFFF8',
  brandPrimary,
  brandLight,
  brandSecondary,
  firstAccent,
  secondAccent,
  thirdAccent,
  brandPrimaryColors: {
    '50': brandLight,
    '100': '#FF7582',
    '200': '#FF6B78',
    '300': '#FF616E',
    '400': '#FF5764',
    '500': '#FA4D5A',
    '600': brandPrimary,
    '700': '#DC2F3C',
    '800': '#DC2F3C',
    '900': '#C81B28',
  },
  brandSecondaryColors: {
    '50': '#8BC1E3',
    '100': '#81B7D9',
    '200': '#77ADCF',
    '300': '#6399BB',
    '400': '#598FB1',
    '500': '#4F85A7',
    '600': brandSecondary,
    '700': '#3B7193',
    '800': '#316789',
    '900': '#275D7F',
  },
  accent1: {
    '50': '#F8FFFF',
    '100': '#EEFFFF',
    '200': '#E4FFFF',
    '300': '#DAFFFF',
    '400': '#D0FFFF',
    '500': '#C6F8FA',
    '600': '#BCEEF0',
    '700': '#B2E4E6',
    '800': '#A8DADC',
    '900': '#9ED0D2',
  },
  accent2: {
    '50': '#778FB1',
    '100': '#6D85A7',
    '200': '#597193',
    '300': '#4F6789',
    '400': '#455D7F',
    '500': '#3B5375',
    '600': '#31496B',
    '700': '#273F61',
    '800': '#1D3557',
    '900': '#132B4D',
  },
  accent3: {
    '50': '#FFB08E',
    '100': '#FFA684',
    '200': '#FF9C7A',
    '300': '#FF9270',
    '400': '#FF8866',
    '500': '#FF7E5C',
    '600': '#F56A48',
    '700': '#EB603E',
    '800': '#E15634',
    '900': '#D74C2A',
  },
};

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  components: {
    fonts: {
      heading: `'Open Sans', sans-serif`,
      body: `'Raleway', sans-serif`,
    },
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
    lightShade: '#FBFFF8',
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

    teal: colors.accent1,
    blue: colors.brandSecondaryColors,
    red: colors.brandPrimaryColors,
    purple: colors.accent2,
    orange: colors.accent3,
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
        color: colors.brandSecondary,
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export { theme, brandPrimary };
