import { Box, Flex, Text, Tooltip } from '@chakra-ui/react';
import { titleCase } from 'title-case';
import { RoutineScrollerExerciseList } from './RoutineScrollerExerciseList';
import { RoutineOptionsMenu } from './RoutineOptionsMenu';
import { theme } from '../../styles/theme';
import { RoutineObject } from '../../types/routine';
import utilStyles from '../../styles/utils.module.css';

export default function RoutineScroller(props: {
  routine: RoutineObject;
  handleDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const listBgColor = theme.colors.accent1['100'];
  const listBorderColor = theme.colors.accent1['700'];
  const borderStyle = `2px solid ${listBorderColor}`;

  const onDeleteRoutine = async (routineId: string) => {
    return props.handleDeleteRoutine(routineId);
  };
  return (
    <Box pos="relative" width={'100%'} h="11.5rem" mb={'4rem'}>
      <Box pos="relative" width={'100%'}>
        <Flex
          paddingX={2}
          paddingY={1}
          pos="relative"
          borderTopRadius="md"
          data-name="Routine name"
          alignItems="center"
          justifyContent={'space-between'}
          borderTop={borderStyle}
          borderX={borderStyle}
          display="inline-flex"
          bgColor={listBgColor}
          mb={-0.5}
          zIndex={5}
          minW={'150px'}
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
            <RoutineOptionsMenu
              onDeleteRoutine={onDeleteRoutine}
              routine={props.routine}
            />
          </Box>
        </Flex>
      </Box>
      <Box
        overflowX="auto"
        pos="relative"
        className={utilStyles.scrollTouch}
        overflowY="hidden"
        data-name="Routine exercises"
        height={'100%'}
      >
        <Box pos="absolute" left="0" top="0" height="100%">
          <RoutineScrollerExerciseList exercises={props.routine.exercises} />
        </Box>
      </Box>
    </Box>
  );
}
