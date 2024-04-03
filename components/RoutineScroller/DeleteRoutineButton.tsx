import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { theme } from '../../styles/theme';

export function DeleteRoutineButton(props: {
  routineId: string;
  onDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const onDeleteRoutine = async (routineId: string) => {
    return props.onDeleteRoutine(routineId);
  };
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <Box>
      <Popover
        strategy="fixed"
        isOpen={isOpen}
        initialFocusRef={initialFocusRef}
        placement="bottom-end"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton
            aria-label="Delete routine"
            icon={<DeleteIcon />}
            color={theme.colors.brandPrimary['500']}
            bgColor={theme.colors.accent1['100']}
            ml={3}
            size="sm"
            onClick={onToggle}
          />
        </PopoverTrigger>
        <PopoverContent
          color={theme.colors.gray['50']}
          bg={theme.colors.accent2['500']}
          borderColor={theme.colors.accent2['900']}
        >
          <PopoverHeader pt={4} fontWeight="bold" border="0">
            You&apos;re about to delete this routine
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton onClick={onClose} />
          <PopoverBody fontSize={'1xl'}>
            Continuing will delete this routine permanently.
          </PopoverBody>
          <PopoverFooter
            border="0"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            pb={4}
          >
            <ButtonGroup size="sm">
              <Button
                ref={initialFocusRef}
                onClick={onClose}
                colorScheme="gray"
                color={theme.colors.gray['800']}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => await onDeleteRoutine(props.routineId)}
                colorScheme="brandPrimary"
                backgroundColor={theme.colors.brandPrimary['800']}
              >
                Continue
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Box>
  );
}
