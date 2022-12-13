import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/layout.module.css';

export const siteTitle = 'Fitness Fam';

export default function Layout({ children, home }) {
  return (
    <Container mt={10}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="App to help organize exercises" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home && (
          <>
            <Image
              priority
              src="/images/profile.png"
              height={144}
              width={144}
              alt={siteTitle}
            />
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <Container className={styles.backToHome}>
          <Link href="/">← Back to Routines</Link>
        </Container>
      )}
    </Container>
  );
}
