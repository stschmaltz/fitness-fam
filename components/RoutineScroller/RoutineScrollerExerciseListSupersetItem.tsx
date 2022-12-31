import { InfoIcon } from '@chakra-ui/icons';
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
        <Flex justifyContent={'space-between'}>
          <Text
            lineHeight={1}
            variant={'bold'}
            color={theme.colors.brandSecondary['700']}
          >
            {exercise.order + 1}
          </Text>
          <Text
            lineHeight={1}
            variant={'bold'}
            color={theme.colors.brandSecondary['700']}
            fontSize="sm"
          >
            Superset
          </Text>
        </Flex>
        <Flex flexDir={'row'} justifyContent="space-between" h="100%">
          <Flex flexDir={'column'} justifyContent={'center'}>
            <Link href={`/exercises/${exercise.id}`}>
              <Flex width="135px" flexDir={'column'}>
                <Flex
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

                <Flex mt={0.5} justifyContent={'center'}>
                  <InfoIcon
                    color={theme.colors.brandSecondary['700']}
                    opacity={'0.5'}
                    mr={4}
                  />
                  {exercise.reps && (
                    <Flex
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
          </Flex>

          {exercise.supersetExercise && (
            <>
              <Flex
                justifyContent={'center'}
                alignItems="center"
                color={theme.colors.brandSecondary['900']}
              >
                <Box
                  width={'1px'}
                  height="100%"
                  backgroundColor={theme.colors.brandPrimary['100']}
                />
              </Flex>
              <Flex flexDir={'column'} justifyContent={'center'}>
                <Link href={`/exercises/${exercise.supersetExercise.id}`}>
                  <Flex width="135px" flexDir={'column'}>
                    <Flex
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

                    <Flex mt={0.5} justifyContent={'center'}>
                      <InfoIcon
                        color={theme.colors.brandSecondary['700']}
                        opacity={'0.5'}
                        mr={4}
                      />
                      {exercise.supersetReps && (
                        <Flex
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
              </Flex>
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
