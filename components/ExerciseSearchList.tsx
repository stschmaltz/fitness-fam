import {
  Badge,
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
import { useEffect, useState } from 'react';
import pull from 'lodash/pull';

import ExerciseInfoModal from './ExerciseInfoModal';
import { EQUIPMENT, ExerciseObject, targetMuscle } from '../types/exercise';
import { theme } from '../styles/theme';
import { appContainer } from '../container/inversify.config';
import { TYPES } from '../container/types';
import {
  ExerciseSearchProviderInterface,
  SearchFilters,
} from '../providers/exercise-searcher/exercise-search.provider.interface';

export default function ExerciseSearchList(props: {
  allExercises: ExerciseObject[];
  handleExerciseOnClick: (exercise: ExerciseObject) => void;
}) {
  const defaultFilters: SearchFilters = {
    equipmentFilters: [],
    targetMuscleFilters: [],
  };
  const {
    isOpen: isFiltersOpen,
    onOpen: OnFiltersOpen,
    onClose: onFiltersClose,
  } = useDisclosure();

  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [searchText, setSearchText] = useState<string>('');

  const exerciseSearcher = appContainer.get<ExerciseSearchProviderInterface>(
    TYPES.ExerciseSearcher
  );
  const [searchResults, setSearchResults] = useState<ExerciseObject[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    ExerciseObject | undefined
  >(undefined);

  useEffect(() => {
    const results =
      exerciseSearcher.searchForExercises(searchText, filters) || [];
    //TODO should slice?
    setSearchResults(results.slice(0, 100));
  }, [filters, searchText, exerciseSearcher]);

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
            {filters.equipmentFilters.length +
              filters.targetMuscleFilters.length}
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
                Filters
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

              {Object.entries(EQUIPMENT).map((equipment) => {
                const [key, value] = equipment;
                const isActive = filters.equipmentFilters?.includes(value);

                return (
                  <Button
                    onClick={() => {
                      setFilters({
                        ...filters,
                        equipmentFilters: isActive
                          ? pull(filters.equipmentFilters, value)
                          : [...filters.equipmentFilters, value],
                      });
                    }}
                    isActive={isActive}
                    key={key}
                  >
                    {value}
                  </Button>
                );
              })}
            </Box>
            <Box mt={5}>
              <Text variant={'h3'} fontSize="2xl" mb={2}>
                Target Muscle
              </Text>

              {Object.entries(targetMuscle).map(([key, value]) => {
                const isActive = filters.targetMuscleFilters?.includes(value);

                return (
                  <Button
                    onClick={() => {
                      setFilters({
                        ...filters,
                        targetMuscleFilters: isActive
                          ? pull(filters.targetMuscleFilters, value)
                          : [...filters.targetMuscleFilters, value],
                      });
                    }}
                    isActive={isActive}
                    key={key}
                  >
                    {value}
                  </Button>
                );
              })}
            </Box>
            <Flex mt={5}>
              <Button onClick={() => setFilters(defaultFilters)} mr={5}>
                Clear Filters
              </Button>
              <Button colorScheme={'brandPrimary'} onClick={onFiltersClose}>
                Apply Filters
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
