import { Box, Container } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from '../styles/layout.module.css';

export const siteTitle = 'FitnessFam.app';

export default function Layout(input: {
  children: ReactNode | undefined;
  showReturnToHome: boolean;
}) {
  const { children, showReturnToHome } = input;

  return (
    <Container maxW={'100rem'} pos={'relative'}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="A free app to help organize workout routines by searching and choosing from an extensive catalogue of exercises. Get your fitness on and join the fam today."
        />
        <meta name="robots" content="all" />
        <meta
          property="og:image"
          content={`https://fitnessfam.app/images/profile.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Box mt={10}>{children}</Box>
      {showReturnToHome && (
        <Container className={styles.backToHome}>
          <Link href="/">← Back to Routines</Link>
        </Container>
      )}
    </Container>
  );
}
