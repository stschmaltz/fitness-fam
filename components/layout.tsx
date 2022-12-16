import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Container,
} from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useLocalStorage } from '../hooks/use-local-storage.hook';
import styles from '../styles/layout.module.css';
import { theme } from '../styles/theme';

export const siteTitle = 'Fitness Fam';

export default function Layout({ children, home }) {
  const [isVisible, setIsVisible] = useLocalStorage('alert', true);

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
        {isVisible && (
          <Alert colorScheme="brandPrimary" status="warning" pos="absolute">
            <AlertIcon />
            <Box color={theme.colors.brandPrimary['900']}>
              <AlertTitle>Warning!</AlertTitle>
              <AlertDescription>
                This application is actively under development. Features/Visuals
                are not complete and may break or change suddenly. Use with
                caution.
              </AlertDescription>
            </Box>
            <CloseButton
              alignSelf="flex-start"
              position="relative"
              right={-1}
              top={-1}
              onClick={() => setIsVisible(false)}
            />
          </Alert>
        )}
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
