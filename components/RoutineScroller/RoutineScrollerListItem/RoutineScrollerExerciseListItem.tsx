import { InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import { theme } from '../../../styles/theme';
import utilStyles from '../../../styles/utils.module.css';
import { RoutineExerciseObject } from '../../../types/routine';

export function RoutineScrollerExerciseListItem(props: {
  exercise: RoutineExerciseObject;
}) {
  const { exercise } = props;
  return (
    <Box
      width="10rem"
      paddingLeft={3}
      css={'&:last-of-type { padding-right: 0.7rem; }'}
    >
      <Flex
        bgColor={theme.colors.brandPrimary['50']}
        height="100%"
        p={2}
        borderRadius="md"
        outline={'1px solid ' + theme.colors.brandPrimary['300']}
        alignItems={'space-between'}
        justifyContent={'space-between'}
        flexDir={'column'}
      >
        <Link href={`/exercises/${exercise.id}`}>
          <Flex justifyContent={'space-between'} flexShrink={0} flexGrow={0}>
            <Text
              opacity={'0.6'}
              lineHeight={1}
              variant={'bold'}
              color={theme.colors.brandSecondary['700']}
            >
              {exercise.order + 1}
            </Text>
            <InfoIcon
              color={theme.colors.brandSecondary['700']}
              opacity={'0.5'}
            />
          </Flex>
          <Flex
            textAlign={'center'}
            justifyContent={'center'}
            alignItems={'flex-start'}
            flexGrow={1}
            maxH={'24px'}
          >
            <Tooltip label={titleCase(exercise.name)}>
              <Text
                className={utilStyles.lineClamp}
                fontWeight={'semibold'}
                overflow={'hidden'}
                fontSize={['md']}
                color={theme.colors.brandSecondary['900']}
              >
                {titleCase(exercise.name)}
              </Text>
            </Tooltip>
          </Flex>
        </Link>
        <Flex justifyContent="space-between" flexShrink={0} flexGrow={0}>
          {exercise.sets && (
            <Flex
              color={theme.colors.brandSecondary['700']}
              flexDir="column"
              alignItems="center"
            >
              <Text
                fontSize={'md'}
                lineHeight={1}
                variant="bold"
                color="inherit"
              >
                {exercise.sets}
              </Text>
              <Text mt={0.5} lineHeight={0.2} color="inherit" fontSize={'sm'}>
                sets
              </Text>
            </Flex>
          )}
          {exercise.reps && (
            <Flex
              color={theme.colors.brandSecondary['700']}
              flexDir="column"
              alignItems="center"
            >
              <Text
                fontSize={'md'}
                lineHeight={1}
                variant="bold"
                color="inherit"
              >
                {exercise.reps}
              </Text>
              <Text mt={0.5} lineHeight={0.2} color="inherit" fontSize={'sm'}>
                reps
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
