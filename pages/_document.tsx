import { ColorModeScript } from '@chakra-ui/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { DocumentContext } from 'next/document';
import { resetServerContext } from 'react-beautiful-dnd';
import { theme } from '../styles/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const page = await ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    resetServerContext();
    return { ...initialProps, ...page };
  }

  private siteDescription =
    'A free app to help organize workout routines by searching and choosing from an extensive catalogue of exercises. Get your fitness on and join the fam today.';

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="Fitness Fam" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Fitness Fam" />
          <meta name="description" content={this.siteDescription} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#E63946" />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=optional"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://fitnessfam.app" />
          <meta name="twitter:title" content="Fitness Fam" />
          <meta name="twitter:description" content={this.siteDescription} />
          <meta
            name="twitter:image"
            content="https://fitnessfam.app/images/profile.png"
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="FitnessFam.app" />
          <meta property="og:description" content={this.siteDescription} />
          <meta property="og:site_name" content="Fitness Fam" />
          <meta property="og:url" content="https://fitnessfam.app" />
          <meta
            property="og:image"
            content="https://fitnessfam.app/images/profile.png"
          />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
