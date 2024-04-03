import { InfoIcon, LinkIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { ExerciseNameText } from './ExerciseNameText';
import { ExerciseFrequencyText } from './ExerciseFrequencyText';
import { theme } from '../../../styles/theme';
import { RoutineExerciseObject } from '../../../types/routine';

export function RoutineScrollerExerciseListSupersetItem(props: {
  exercise: RoutineExerciseObject;
}) {
  const { exercise } = props;

  return (
    <Box
      width="300px"
      paddingLeft={3}
      css={'&:last-of-type { padding-right: 0.7rem; }'}
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
        <Flex justifyContent={'space-between'} alignItems={'center'}>
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
            <Flex flexDir={'column'} justifyContent={'flex-start'} h="100%">
              <Flex pos={'relative'} width="125px" flexDir={'column'} h="100%">
                <ExerciseNameText exerciseName={exercise.name} />

                {(exercise.reps || exercise.supersetReps) && (
                  <Flex
                    alignItems={'flex-end'}
                    w="100%"
                    justifyContent={'flex-end'}
                    height="100%"
                  >
                    <ExerciseFrequencyText
                      value={exercise.reps ?? 0}
                      type="reps"
                    />
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
                  h="100%"
                  opacity={'0.5'}
                  backgroundColor={theme.colors.brandPrimary['100']}
                />
              </Flex>
              <Link href={`/exercises/${exercise.supersetExercise.id}`}>
                <Flex flexDir={'column'} justifyContent={'flex-start'} h="100%">
                  <Flex
                    pos={'relative'}
                    width="125px"
                    flexDir={'column'}
                    h="100%"
                  >
                    <ExerciseNameText
                      exerciseName={exercise.supersetExercise.name}
                    />

                    {exercise.supersetReps && (
                      <Flex
                        alignItems={'flex-end'}
                        w="100%"
                        justifyContent={'flex-end'}
                      >
                        <ExerciseFrequencyText
                          value={exercise.supersetReps}
                          type="reps"
                        />
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
            <ExerciseFrequencyText value={exercise.sets} type="sets" />
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
