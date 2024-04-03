import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { theme } from '../../styles/theme';
import { RoutineObject } from '../../types/routine';

export function DeleteMenuItem(props: {
  routine: RoutineObject;
  onDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const { routine, onDeleteRoutine } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const finalRef = useRef<HTMLButtonElement>(null);

  return (
    <MenuItem
      onClick={onToggle}
      bgColor={'inherit'}
      icon={<DeleteIcon color={theme.colors.brandPrimary['600']} />}
    >
      <Text
        fontSize={'md'}
        fontWeight="semibold"
        color={theme.colors.brandPrimary['600']}
      >
        Delete Routine
      </Text>

      <Modal
        isCentered={true}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent
          color={theme.colors.gray['50']}
          bg={theme.colors.accent2['500']}
          borderColor={theme.colors.accent2['900']}
        >
          <ModalHeader> You&apos;re about to delete this routine</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={'md'}>
            Continuing will delete the{' '}
            <Text
              as="span"
              fontWeight={'semibold'}
              textDecoration={'underline'}
              color="white"
              fontSize={'xl'}
            >
              {routine.name}
            </Text>{' '}
            routine permanently.
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={onClose}
              colorScheme="gray"
              color={theme.colors.gray['800']}
              mr={3}
            >
              Cancel
            </Button>
            <Button
              onClick={async () =>
                await onDeleteRoutine(routine._id.toString())
              }
              colorScheme="brandPrimary"
              backgroundColor={theme.colors.brandPrimary['800']}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </MenuItem>
  );
}
