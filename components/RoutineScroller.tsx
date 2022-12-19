import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import { Box, Flex, Link, Text, Tooltip } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { titleCase } from 'title-case';
import { theme } from '../styles/theme';
import utilStyles from '../styles/utils.module.css';
import { RoutineObject } from '../types/routine';

export default function RoutineScroller(props: {
  routine: RoutineObject;
  handleDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const listBgColor = theme.colors.accent1['100'];
  const listBorderColor = theme.colors.brandPrimary['100'];
  const scrollRef = useRef<HTMLInputElement>(null);

  const defaultExerciseListScrollEventCSS = ``;
  const fullyScrolledStyles = `
      border-bottom-right-radius:4px;
      border-top-right-radius:4px;
      border-right: 1px solid ${listBorderColor};
    `;
  const [exerciseListScrollEventCSS, setExerciseListScrollEventCSS] =
    useState<string>(defaultExerciseListScrollEventCSS);
  // TODO: type this event properly
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleScroll = (event: { target: any }) => {
    const { target } = event;
    const endOfScroll =
      target.scrollLeft + target.offsetWidth >= target.scrollWidth;

    if (exerciseListScrollEventCSS != fullyScrolledStyles && endOfScroll) {
      setExerciseListScrollEventCSS(fullyScrolledStyles);
    }
    if (
      exerciseListScrollEventCSS !== defaultExerciseListScrollEventCSS &&
      !endOfScroll
    ) {
      setExerciseListScrollEventCSS(defaultExerciseListScrollEventCSS);
    }
  };

  const onDeleteRoutine = async (routineId: string) => {
    return props.handleDeleteRoutine(routineId);
  };
  return (
    <Box>
      <Flex
        paddingX={2}
        paddingY={1}
        zIndex={2}
        pos="relative"
        borderTopRadius="md"
        data-name="Routine name"
        alignItems="center"
        borderTop={'1px solid ' + listBorderColor}
        borderX={'1px solid ' + listBorderColor}
        display="inline-flex"
        bgColor={listBgColor}
        mb={-0.4}
      >
        <Text
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace={'nowrap'}
          variant="h3"
          className={utilStyles.textOutline}
        >
          {props.routine.name}
        </Text>
        <DeleteIcon
          color={theme.colors.primary}
          ml={3}
          onClick={async () =>
            await onDeleteRoutine(props.routine._id.toString())
          }
        />
      </Flex>
      <Box
        pos="relative"
        h="11rem"
        className={utilStyles.scrollTouch}
        overflowX="auto"
        ref={scrollRef}
        onScroll={handleScroll}
        overflowY="hidden"
        bgColor={listBgColor}
        data-name="Routine exercises"
        borderLeft={'1px solid ' + listBorderColor}
        borderY={'1px solid ' + listBorderColor}
        borderBottom={'1px solid ' + listBorderColor}
        borderBottomLeftRadius={'md'}
        css={exerciseListScrollEventCSS}
      >
        <Box pos="absolute" left="0" top="0" height="100%">
          <Flex flexDir="row" data-name="Routine exercise list" height="100%">
            {props.routine.exercises.map((exercise) => (
              <Box
                key={exercise.id}
                width="150px"
                height="10rem"
                paddingY={'10px'}
                paddingLeft={'10px'}
                css={'&:last-of-type { padding-right: 10px; }'}
              >
                <Flex
                  bgColor={theme.colors.brandPrimary['50']}
                  height="100%"
                  p={2}
                  borderRadius="md"
                  outline={'1px solid ' + theme.colors.brandPrimary['300']}
                  alignItems={'space-between'}
                  justifyContent={'space-between'}
                  flexDir="column"
                >
                  {' '}
                  <Link href={`/exercises/${exercise.id}`}>
                    <Flex
                      justifyContent="space-between"
                      flexShrink={0}
                      flexGrow={0}
                    >
                      <Text
                        lineHeight={1}
                        variant="bold"
                        color={theme.colors.brandSecondary['700']}
                      >
                        {exercise.order}
                      </Text>
                      <InfoIcon
                        color={theme.colors.brandSecondary['700']}
                        opacity="0.5"
                      />
                    </Flex>
                    <Flex
                      textAlign={'center'}
                      justifyContent="center"
                      alignItems={'flex-start'}
                      flexGrow={1}
                    >
                      <Tooltip label={titleCase(exercise.name)}>
                        <Text
                          className={utilStyles.lineClamp}
                          fontWeight={'semibold'}
                          overflow="hidden"
                          fontSize="lg"
                          color={theme.colors.brandSecondary['900']}
                        >
                          {titleCase(exercise.name)}
                        </Text>
                      </Tooltip>
                    </Flex>
                  </Link>
                  {/* <Flex
                    justifyContent="space-between"
                    flexShrink={0}
                    flexGrow={0}
                  >
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
                        {Math.random() > 0.8
                          ? 2
                          : Math.random() > 0.5
                          ? 3
                          : Math.random() > 0.3
                          ? 4
                          : 3}
                      </Text>
                      <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
                        sets
                      </Text>
                    </Flex>
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
                        {Math.random() > 0.8
                          ? 8
                          : Math.random() > 0.5
                          ? 10
                          : Math.random() > 0.3
                          ? 12
                          : 16}
                      </Text>
                      <Text lineHeight={0.2} color="inherit" fontSize={'sm'}>
                        reps
                      </Text>
                    </Flex>
                  </Flex> */}
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
