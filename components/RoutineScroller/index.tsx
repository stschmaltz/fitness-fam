import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { titleCase } from 'title-case';
import RoutineScrollerExerciseList from './RoutineScrollerExerciseList';
import DeleteRoutineButton from './DeleteRoutineButton';
import { theme } from '../../styles/theme';
import utilStyles from '../../styles/utils.module.css';
import { RoutineObject } from '../../types/routine';

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
    <Box pos="relative" width={'100%'} overflow="hidden">
      <Box pos="relative" width={'100%'}>
        <Flex
          paddingX={2}
          paddingY={1}
          pos="relative"
          borderTopRadius="md"
          data-name="Routine name"
          alignItems="center"
          borderTop={'1px solid ' + listBorderColor}
          borderX={'1px solid ' + listBorderColor}
          display="inline-flex"
          bgColor={listBgColor}
          mb={-0.4}
          zIndex={2}
          minW={'150px'}
          maxWidth="587px"
        >
          <Tooltip
            label={titleCase(props.routine.name)}
            overflow="hidden"
            maxHeight={'50vh'}
          >
            <Text
              maxWidth={'63vw'}
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace={'nowrap'}
              variant="h3"
              fontSize={['1xl', '1xl', '2xl']}
              className={utilStyles.textOutline}
            >
              {props.routine.name}
            </Text>
          </Tooltip>
          <Box ml={3}>
            <DeleteRoutineButton
              onDeleteRoutine={onDeleteRoutine}
              routineId={props.routine._id.toString()}
            />
          </Box>
        </Flex>
      </Box>
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
          <RoutineScrollerExerciseList exercises={props.routine.exercises} />
        </Box>
      </Box>
    </Box>
  );
}
