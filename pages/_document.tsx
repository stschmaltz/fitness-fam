import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';
import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps, ...page };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
