import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { theme } from '../../../styles/theme';

interface Props {
  type: 'sets' | 'reps';
  value: number;
}

export const ExerciseFrequencyText: React.FC<Props> = ({ value, type }) => {
  return (
    <Flex
      color={theme.colors.brandSecondary['700']}
      flexDir="column"
      alignItems="center"
    >
      <Text fontSize={'md'} lineHeight={1} variant="bold" color="inherit">
        {value ? value : '-'}
      </Text>
      <Text mt={0.5} lineHeight={0.2} color="inherit" fontSize={'sm'}>
        {type}
      </Text>
    </Flex>
  );
};
