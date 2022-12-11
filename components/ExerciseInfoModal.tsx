import {
  Box,
  Button,
  Image,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
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
          <Text fontSize="3xl">{exercise?.name}</Text>
          <Box>
            <List>
              <ListItem>
                {' '}
                <Text as="b">Body Part:</Text> {exercise?.bodyPart}
              </ListItem>
              <ListItem>
                {' '}
                <Text as="b">Equipment:</Text> {exercise?.equipment}
              </ListItem>
              <ListItem>
                {' '}
                <Text as="b">Target:</Text> {exercise?.target}
              </ListItem>
              <ListItem>
                <Box>
                  <Image
                    src={exercise?.gifUrl}
                    alt="my gif"
                    width={360}
                    height={360}
                  />
                </Box>
                {}
              </ListItem>
              {exercise?.instructions.length > 1 && (
                <ListItem>
                  <Text as="b">Instructions</Text>
                  <List>
                    {exercise?.instructions.map((instruction) => (
                      <ListItem key={instruction.number}>
                        {instruction.description}
                      </ListItem>
                    ))}
                  </List>
                </ListItem>
              )}
            </List>
          </Box>
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
