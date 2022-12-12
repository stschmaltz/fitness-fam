import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import BasicExerciseInfo from './BasicExerciseInfo';
import { ExerciseObject } from '../types/exercise';

export default function ExerciseInfoModal(props: {
  exercise: ExerciseObject;
  handleModalOnClose: () => void;
  isOpen: boolean;
}) {
  const { exercise, isOpen } = props;
  const handleModalOnClose = () => {
    props.handleModalOnClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <BasicExerciseInfo exercise={exercise} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleModalOnClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
