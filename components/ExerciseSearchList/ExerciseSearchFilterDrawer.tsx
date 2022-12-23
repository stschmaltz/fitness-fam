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
  Text,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import pull from 'lodash/pull';

import { EQUIPMENT, ExerciseObject, targetMuscle } from '../../types/exercise';
import { appContainer } from '../../container/inversify.config';
import { TYPES } from '../../container/types';
import {
  ExerciseSearchProviderInterface,
  SearchFilters,
} from '../../providers/exercise-searcher/exercise-search.provider.interface';

export default function ExerciseSearchFilterDrawer(props: {
  onDrawerClose: () => void;
  isDrawerOpen: boolean;
  updateSearchResults: (results: ExerciseObject[]) => void;
  searchText: string;
  setFilterCount: (count: number) => void;
}) {
  const {
    isDrawerOpen,
    onDrawerClose,
    searchText,
    updateSearchResults,
    setFilterCount,
  } = props;
  const defaultFilters: SearchFilters = {
    equipmentFilters: [],
    targetMuscleFilters: [],
  };
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const exerciseSearcher = appContainer.get<ExerciseSearchProviderInterface>(
    TYPES.ExerciseSearcher
  );

  const onFiltersClose = () => {
    onDrawerClose();
  };

  useEffect(() => {
    const exerciseFilterCount = filters.equipmentFilters.length;
    const muscleFilterCount = filters.targetMuscleFilters.length;

    setFilterCount(exerciseFilterCount + muscleFilterCount);
  }, [filters, setFilterCount]);

  useEffect(() => {
    const results =
      exerciseSearcher.searchForExercises(searchText, filters) || [];

    updateSearchResults(results.slice(0, 100));
  }, [filters, searchText, exerciseSearcher, updateSearchResults]);

  return (
    <Drawer placement={'bottom'} onClose={onFiltersClose} isOpen={isDrawerOpen}>
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
          <Flex>
            <Button onClick={() => setFilters(defaultFilters)} mr={5}>
              Clear Filters
            </Button>
            <Button colorScheme={'brandPrimary'} onClick={onFiltersClose}>
              Apply Filters
            </Button>
          </Flex>
          <Box mt={3}>
            <Text variant={'h3'} fontSize="2xl" mb={2}>
              Target Muscle
            </Text>

            {Object.entries(targetMuscle).map(([key, value]) => {
              const isActive = filters.targetMuscleFilters?.includes(value);

              return (
                <Button
                  onClick={() => {
                    const newFilters = {
                      ...filters,
                      targetMuscleFilters: isActive
                        ? pull(filters.targetMuscleFilters, value)
                        : [...filters.targetMuscleFilters, value],
                    };
                    setFilters(newFilters);
                  }}
                  isActive={isActive}
                  key={key}
                >
                  {value}
                </Button>
              );
            })}
          </Box>
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
                    const newFilters = {
                      ...filters,
                      equipmentFilters: isActive
                        ? pull(filters.equipmentFilters, value)
                        : [...filters.equipmentFilters, value],
                    };
                    setFilters(newFilters);
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
  );
}
