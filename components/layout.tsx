import { Container } from '@chakra-ui/react';
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
    <Container mt={10} maxW={'40rem'}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="An app to help organize workout routines using a dataset of exercises to choose from."
        />
        <meta name="robots" content="all" />
        <meta
          property="og:image"
          content={`https://fitnessfam.app/images/profile.png`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}></header>
      <main>{children}</main>
      {showReturnToHome && (
        <Container className={styles.backToHome}>
          <Link href="/">← Back to Routines</Link>
        </Container>
      )}
    </Container>
  );
}
