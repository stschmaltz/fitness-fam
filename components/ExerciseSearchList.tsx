import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon, InfoIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import ExerciseInfoModal from './ExerciseInfoModal';
import { EQUIPMENT, ExerciseObject, TARGET_MUSCLE } from '../types/exercise';
import { theme } from '../styles/theme';
import { appContainer } from '../container/inversify.config';
import { TYPES } from '../container/types';
import { ExerciseSearcherInterface } from '../providers/exercise-searcher/exercise-searcher.interface';

export default function ExerciseSearchList(props: {
  allExercises: ExerciseObject[];
  handleExerciseOnClick: (exercise: ExerciseObject) => void;
}) {
  const {
    isOpen: isFiltersOpen,
    onOpen: OnFiltersOpen,
    onClose: onFiltersClose,
  } = useDisclosure();

  const exerciseSearcher = appContainer.get<ExerciseSearcherInterface>(
    TYPES.ExerciseSearcher
  );
  const [searchResults, setSearchResults] = useState<ExerciseObject[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseObject | undefined
  >(undefined);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const results =
      exerciseSearcher.searchForExercises(event.target.value) || [];
    //TODO should slice?
    setSearchResults(results.slice(0, 100));
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
        </Button>
        <Input
          colorScheme="brandPrimary"
          variant="filled"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </Flex>
      <List overflowY="auto">
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
      <Drawer
        placement={'bottom'}
        onClose={onFiltersClose}
        isOpen={isFiltersOpen}
      >
        <DrawerOverlay />
        <DrawerContent minHeight="40vh" maxHeight={'70vh'}>
          <DrawerHeader borderBottomWidth="1px">
            <Flex alignItems={'center'} justifyContent="space-between">
              <Text variant={'h1'} fontSize="2xl">
                Filters{' '}
              </Text>
              <IconButton
                onClick={onFiltersClose}
                aria-label="close filters"
                icon={<CloseIcon />}
                mt={5}
              >
                Close
              </IconButton>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Box>
              <Text variant={'h3'} fontSize="2xl" mb={2}>
                Equipment
              </Text>

              {Object.values(EQUIPMENT).map((equipment) => (
                <Button key={equipment}>{equipment}</Button>
              ))}
            </Box>
            <Box mt={5}>
              <Text variant={'h3'} fontSize="2xl" mb={2}>
                Target Muscle
              </Text>

              {Object.values(TARGET_MUSCLE).map((targetMuscle) => (
                <Button key={targetMuscle}>{targetMuscle}</Button>
              ))}
            </Box>
            <Flex>
              <Button
                colorScheme={'brandPrimary'}
                mt={5}
                onClick={onFiltersClose}
              >
                Apply Filters
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
