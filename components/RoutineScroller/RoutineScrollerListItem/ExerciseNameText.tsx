import React from 'react';
import { Flex, Text, Tooltip } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import { theme } from '../../../styles/theme';
import utilStyles from '../../../styles/utils.module.css';

interface Props {
  exerciseName: string;
}

export const ExerciseNameText: React.FC<Props> = ({ exerciseName }) => {
  return (
    <Flex
      textAlign={'center'}
      justifyContent={'center'}
      alignItems={'flex-start'}
      flexGrow={1}
      h="3rem"
    >
      <Tooltip label={titleCase(exerciseName)}>
        <Text
          className={utilStyles.lineClamp}
          fontWeight={'semibold'}
          overflow={'hidden'}
          fontSize={['md']}
          color={theme.colors.brandSecondary['900']}
        >
          {titleCase(exerciseName)}
        </Text>
      </Tooltip>
    </Flex>
  );
};
