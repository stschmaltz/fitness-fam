import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { AddIcon, InfoIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import ExerciseInfoModal from './ExerciseInfoModal';
import { ExerciseObject } from '../types/exercise';
import { ExerciseSearcher } from '../providers/exercise-search.provider';
import { theme } from '../styles/theme';

export default function ExerciseSearchList(props: {
  allExercises: ExerciseObject[];
  handleExerciseOnClick: (exercise: ExerciseObject) => void;
}) {
  const [searcher, setSearcher] = useState<ExerciseSearcher>(undefined);
  const [searchResults, setSearchResults] = useState<ExerciseObject[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseObject | undefined
  >(undefined);

  useEffect(() => {
    return setSearcher(new ExerciseSearcher());
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results = searcher?.searchForExercises(event.target.value) || [];
    //TODO should slice?
    setSearchResults(results.slice(0, 50));
  };

  const handleExerciseOnClick = (exercise: ExerciseObject) => {
    const newSearchResults = searchResults.filter(
      (searchResult) => searchResult.id !== exercise.id
    );
    setSearchResults(newSearchResults);

    return props.handleExerciseOnClick(exercise);
  };

  const showExerciseInfo = (exercise: ExerciseObject) => {
    setSelectedExercise(exercise);
  };

  return (
    <Box
      backgroundColor={theme.colors.brandPrimary['50']}
      maxHeight="inherit"
      minHeight="inherit"
      overflow="hidden"
      p={2}
    >
      <Text fontSize="4xl">Exercises</Text>
      <Flex>
        <Button mb={3} mr={3} colorScheme="accent2">
          Filters
        </Button>
        <Input
          colorScheme="brandPrimary"
          variant="filled"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </Flex>
      <List minHeight="inherit" maxHeight="inherit" overflowY="auto">
        {searchResults.length > 0 ? (
          searchResults.map((exercise) => (
            <ListItem key={exercise.id}>
              <Flex>
                <Button
                  aria-label="add exercise to routine"
                  justifyContent="flex-start"
                  backgroundColor={theme.colors.gray['50']}
                  leftIcon={
                    <AddIcon
                      fontSize={'1xl'}
                      color={theme.colors.accent3['500']}
                    />
                  }
                  flexGrow="1"
                  flexShrink="1"
                  overflowX="clip"
                  onClick={() =>
                    handleExerciseOnClick(exercise as ExerciseObject)
                  }
                >
                  <Text fontSize="md">{exercise.name}</Text>
                </Button>
                <IconButton
                  color={theme.colors.thirdAccent}
                  aria-label="add exercise to routine"
                  icon={<InfoIcon />}
                  onClick={() => showExerciseInfo(exercise as ExerciseObject)}
                  backgroundColor={theme.colors.gray['50']}
                />
              </Flex>
            </ListItem>
          ))
        ) : (
          <Text
            fontSize="2xl"
            fontStyle="italic"
            color={theme.colors.gray['500']}
          >
            Search and exercises will appear here to add to your routine
          </Text>
        )}
      </List>
      <ExerciseInfoModal
        exercise={selectedExercise}
        handleModalOnClose={() => setSelectedExercise(undefined)}
        isOpen={selectedExercise !== undefined}
      />
    </Box>
  );
}
