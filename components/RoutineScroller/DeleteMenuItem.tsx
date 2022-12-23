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

export default function DeleteMenuItem(props: {
  routineId: string;
  onDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const { routineId, onDeleteRoutine } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const finalRef = useRef<HTMLButtonElement>(null);

  return (
    <MenuItem
      //   bgColor={theme.colors.accent1['50']}
      //   _hover={{ bgColor: theme.colors.accent1['100'] }}
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

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          color={theme.colors.gray['50']}
          bg={theme.colors.accent2['500']}
          borderColor={theme.colors.accent2['900']}
        >
          <ModalHeader> You&apos;re about to delete this routine</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>

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
              onClick={async () => await onDeleteRoutine(routineId)}
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
