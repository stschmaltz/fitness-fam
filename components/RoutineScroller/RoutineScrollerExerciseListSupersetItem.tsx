import { InfoIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import { theme } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import { RoutineExerciseObject } from '../../types/routine';

export default function RoutineScrollerExerciseListSupersetItem(props: {
  exercise: RoutineExerciseObject;
}) {
  const { exercise } = props;

  return (
    <Box
      width="300px"
      height="10.3rem"
      paddingY={'10px'}
      paddingLeft={'10px'}
      css={'&:last-of-type { padding-right: 10px; }'}
    >
      <Flex
        height="100%"
        pos={'relative'}
        p={2}
        flexDir={'column'}
        borderRadius="md"
        outline={'1px solid ' + theme.colors.brandPrimary['300']}
        bgColor={theme.colors.brandPrimary['50']}
      >
        <Flex
          maxH={'24px'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text
            lineHeight={1}
            opacity={'0.6'}
            variant={'bold'}
            color={theme.colors.brandSecondary['700']}
          >
            {exercise.order + 1}
          </Text>
          <Flex>
            <Text
              lineHeight={1}
              variant={'bold'}
              color={theme.colors.brandSecondary['700']}
              fontSize="sm"
              opacity={'0.5'}
            >
              Superset
            </Text>
            <LinkIcon
              ml={2}
              opacity={'0.8'}
              color={theme.colors.accent2['50']}
              fontSize={'sm'}
            />
          </Flex>

          <Link
            href={`/exercises/${exercise.id}?supersetId=${exercise.supersetExerciseId}`}
          >
            <InfoIcon
              fontSize={'xl'}
              color={theme.colors.brandSecondary['700']}
              opacity={'0.5'}
            />
          </Link>
        </Flex>
        <Flex flexDir={'row'} justifyContent="space-between" h="100%">
          <Link href={`/exercises/${exercise.id}`}>
            <Flex flexDir={'column'} justifyContent={'flex-start'}>
              <Flex pos={'relative'} width="125px" flexDir={'column'}>
                <Flex
                  minH={'3rem'}
                  textAlign={'center'}
                  justifyContent={'center'}
                  alignItems={'flex-start'}
                  flexGrow={1}
                >
                  <Tooltip label={titleCase(exercise.name)}>
                    <Text
                      className={utilStyles.lineClamp}
                      fontWeight={'semibold'}
                      overflow={'hidden'}
                      fontSize={['md', 'lg']}
                      color={theme.colors.brandSecondary['900']}
                    >
                      {titleCase(exercise.name)}
                    </Text>
                  </Tooltip>
                </Flex>

                {exercise.reps && (
                  <Flex
                    pos={'absolute'}
                    top="5.2rem"
                    right={1}
                    pl={2}
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
                    <Text
                      mt={0.5}
                      lineHeight={0.2}
                      color="inherit"
                      fontSize={'sm'}
                    >
                      reps
                    </Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Link>

          {exercise.supersetExercise && (
            <>
              <Flex
                flexShrink={0}
                width={'16px'}
                justifyContent={'center'}
                alignItems="center"
                color={theme.colors.brandSecondary['900']}
              >
                <Box
                  width={'1px'}
                  height="100%"
                  opacity={'0.5'}
                  backgroundColor={theme.colors.brandPrimary['100']}
                />
              </Flex>
              <Link href={`/exercises/${exercise.supersetExercise.id}`}>
                <Flex flexDir={'column'} justifyContent={'flex-start'}>
                  <Flex pos={'relative'} width="125px" flexDir={'column'}>
                    <Flex
                      minH={'3rem'}
                      textAlign={'center'}
                      justifyContent={'center'}
                      alignItems={'flex-start'}
                      flexGrow={1}
                    >
                      <Tooltip
                        label={titleCase(exercise.supersetExercise.name)}
                      >
                        <Text
                          className={utilStyles.lineClamp}
                          fontWeight={'semibold'}
                          overflow={'hidden'}
                          fontSize={['md', 'lg']}
                          color={theme.colors.brandSecondary['900']}
                        >
                          {titleCase(exercise.supersetExercise.name)}
                        </Text>
                      </Tooltip>
                    </Flex>

                    {exercise.supersetReps && (
                      <Flex
                        pos={'absolute'}
                        top="5.2rem"
                        right={1}
                        pl={2}
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
                          {exercise.supersetReps}
                        </Text>
                        <Text
                          mt={0.5}
                          lineHeight={0.2}
                          color="inherit"
                          fontSize={'sm'}
                        >
                          reps
                        </Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Link>
            </>
          )}
        </Flex>
        <Flex position={'absolute'} bottom={2}>
          {exercise.sets && (
            <Flex
              color={theme.colors.brandSecondary['700']}
              flexDir="column"
              alignItems={'center'}
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
        </Flex>
      </Flex>
    </Box>
  );
}
