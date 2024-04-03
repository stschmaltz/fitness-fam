import React from 'react';
import Link from 'next/link';
import { Button, Flex } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { theme } from '../../styles/theme';

const EmptyState: React.FC = () => {
  return (
    <Flex flexWrap="wrap" flexDir={'column'}>
      <Text mb={'25'} fontStyle={'italic'} color={theme.colors.accent2['600']}>
        You have no routines yet
      </Text>
      <Link href="/new-routine">
        <Button
          w={'100%'}
          colorScheme="accent1"
          paddingX={30}
          paddingY={10}
          variant="solid"
          size="lg"
          leftIcon={<AddIcon color={theme.colors.accent2['400']} mr="5" />}
        >
          <Flex
            wrap="wrap"
            justifyContent="center"
            flexDir="column"
            color={theme.colors.accent2['400']}
          >
            <Text color="inherit">Click here to </Text>
            <Text color="inherit">create a new routine </Text>
          </Flex>
        </Button>
      </Link>
    </Flex>
  );
};

export default EmptyState;
