import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RoutineExerciseObject } from '../types/routine';

export default function StopWatch(props: {
  currentExercise: RoutineExerciseObject;
  options?: {
    includeMilliseconds?: boolean;
    includeHours?: boolean;
    includeButtons?: boolean;
  };
}) {
  const defaultOptions = {
    includeHours: false,
    includeMilliseconds: true,
    includeButtons: true,
  };
  const { currentExercise, options: propsOptions } = props;
  const { includeButtons, includeHours, includeMilliseconds } = {
    ...defaultOptions,
    ...propsOptions,
  };

  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef<NodeJS.Timer>();
  const startTimer = () =>
    setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 10);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = startTimer();
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = startTimer();
  };

  const handleReset = () => {
    clearInterval(increment.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  useEffect(() => {
    handleReset();
  }, [currentExercise]);

  const formatTime = () => {
    const getMilliSeconds = `${timer % 100}`.padStart(2, '0');
    const getSeconds = `${Math.floor(timer / 100) % 60}`.padStart(2, '0');
    const minutes = Math.floor(timer / 6000);
    const getMinutes = `${minutes % 60}`.padStart(2, '0');
    const getHours = `${Math.floor(timer / 3600)}`.padStart(2, '0');

    const hourText = includeHours ? `${getHours} : ` : '';
    const milliSecondText = includeMilliseconds ? ` : ${getMilliSeconds}` : '';

    return `${hourText}${getMinutes} : ${getSeconds}${milliSecondText}`;
  };

  return (
    <Box minW={'180px'}>
      <Flex flexDir={'column'} alignItems={'center'}>
        <Text variant="h3" fontSize={'md'} textAlign={'center'}>
          Timer
        </Text>
        <Text>{formatTime()}</Text>
        {includeButtons && (
          <Flex>
            <Button onClick={handleReset} disabled={!isActive}>
              Reset
            </Button>
            {!isActive && !isPaused ? (
              <Button onClick={handleStart}>Start</Button>
            ) : isPaused ? (
              <Button onClick={handlePause}>Pause</Button>
            ) : (
              <Button onClick={handleResume}>Resume</Button>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
