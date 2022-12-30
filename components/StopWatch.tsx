import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { RoutineExerciseObject } from '../types/routine';

export default function StopWatch(props: {
  currentExercise: RoutineExerciseObject;
}) {
  const { currentExercise } = props;
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const increment = useRef<NodeJS.Timer>();

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  const handlePause = () => {
    clearInterval(increment.current);
    setIsPaused(false);
  };

  const handleResume = () => {
    setIsPaused(true);
    increment.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
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
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = Math.floor(timer / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };
  return (
    <Box>
      <Flex flexDir={'column'} alignItems={'center'}>
        <Text variant="h3" fontSize={'md'}>
          Timer
        </Text>
        <Text>{formatTime()}</Text>
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
      </Flex>
    </Box>
  );
}
