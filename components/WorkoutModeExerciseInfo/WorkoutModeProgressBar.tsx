import { Box, Button, Flex, Progress, Text } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

export default function WorkoutModeProgressBar(props: {
  currentValue: number;
  maxValue: number;
  handlePreviousClicked: () => void;
  handleNextClicked: () => void;
  handleCompleteClicked: () => void;
}) {
  const {
    currentValue,
    maxValue,
    handlePreviousClicked,
    handleNextClicked,
    handleCompleteClicked,
  } = props;
  const currentExerciseIndex = currentValue - 1;

  return (
    <Box backgroundColor={'white'}>
      <Progress
        max={maxValue}
        value={currentValue}
        size="sm"
        colorScheme="brandPrimary"
      />

      <Flex w={'100%'} justifyContent={'space-between'} mt={2}>
        <Button
          disabled={!currentExerciseIndex || currentExerciseIndex === 0}
          leftIcon={<ArrowBackIcon />}
          variant={'outline'}
          onClick={() => handlePreviousClicked()}
        >
          Previous
        </Button>

        <Flex flexGrow={2} flexShrink={1} justifyContent={'center'}>
          <Text fontWeight={'bold'}>
            {currentValue}/{maxValue}
          </Text>
        </Flex>
        {currentValue < maxValue ? (
          <Button
            colorScheme={'brandPrimary'}
            rightIcon={<ArrowForwardIcon />}
            onClick={() => handleNextClicked()}
          >
            <Text fontWeight={'semibold'} fontSize={'lg'} color="white">
              Next
            </Text>
          </Button>
        ) : (
          <Button
            colorScheme={'brandPrimary'}
            onClick={() => handleCompleteClicked()}
          >
            Complete
          </Button>
        )}
      </Flex>
    </Box>
  );
}
