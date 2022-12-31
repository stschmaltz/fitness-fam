import { InfoIcon } from '@chakra-ui/icons';
import { Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import { theme } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import { RoutineExerciseObject } from '../../types/routine';

export default function RoutineScrollerExerciseListSupersetItem(props: {
  exercise: RoutineExerciseObject;
}) {
  const { exercise } = props;

  console.log('nice to be here', exercise);
  console.log('bet', exercise.supersetExercise);
  return (
    <Flex
      width="300px"
      height="10.3rem"
      paddingY={'10px'}
      paddingLeft={'10px'}
      css={'&:last-of-type { padding-right: 10px; }'}
    >
      <Flex
        width="150px"
        bgColor={theme.colors.brandPrimary['500']}
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
              <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
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
              <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
                reps
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      {exercise.supersetExercise && (
        <Flex
          bgColor={theme.colors.brandPrimary['900']}
          height="100%"
          width="150px"
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
            >
              <Tooltip label={titleCase(exercise.supersetExercise.name)}>
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
                <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
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
                <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
                  reps
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
