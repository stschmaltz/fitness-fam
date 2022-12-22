import {
  Badge,
  Button,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import ExerciseSearchFilterDrawer from './ExerciseSearchFilterDrawer';
import ExerciseInfoModal from '../ExerciseInfoModal';
import { ExerciseObject } from '../../types/exercise';
import { theme } from '../../styles/theme';

export default function ExerciseSearchList(props: {
  allExercises: ExerciseObject[];
  handleExerciseOnClick: (exercise: ExerciseObject) => void;
}) {
  const {
    isOpen: isFiltersOpen,
    onOpen: OnFiltersOpen,
    onClose: onFiltersClose,
  } = useDisclosure();

  const [filterCount, setFilterCount] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const [searchResults, setSearchResults] = useState<ExerciseObject[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseObject | undefined
  >(undefined);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
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
    <Flex
      flexDir="column"
      backgroundColor={theme.colors.brandPrimary['50']}
      maxHeight="inherit"
      minHeight="inherit"
      overflow="hidden"
      p={2}
    >
      <Text fontSize="4xl">Exercises</Text>
      <Flex>
        <Button mb={3} mr={3} colorScheme="accent2" onClick={OnFiltersOpen}>
          Filters
          <Badge pos="absolute" top={0} right={0}>
            {filterCount}
          </Badge>
        </Button>

        <Input
          colorScheme="brandPrimary"
          variant="filled"
          placeholder="Search"
          onChange={handleSearchInputChange}
        />
      </Flex>
      <List overflowY="auto">
        {searchResults.length > 0 ? (
          searchResults.map((exercise) => (
            <ListItem key={exercise.id}>
              <Flex backgroundColor={theme.colors.gray['50']}>
                <Button
                  aria-label="add exercise to routine"
                  justifyContent="flex-start"
                  backgroundColor={theme.colors.gray['50']}
                  leftIcon={
                    <AddIcon
                      fontSize={'1xl'}
                      color={theme.colors.brandSecondary['500']}
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
                  color={theme.colors.secondAccent}
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
      {selectedExercise && (
        <ExerciseInfoModal
          exercise={selectedExercise}
          handleModalOnClose={() => setSelectedExercise(undefined)}
          isOpen={selectedExercise !== undefined}
        />
      )}
      <ExerciseSearchFilterDrawer
        isDrawerOpen={isFiltersOpen}
        onDrawerClose={onFiltersClose}
        searchText={searchText}
        updateSearchResults={setSearchResults}
        setFilterCount={setFilterCount}
      />
    </Flex>
  );
}
