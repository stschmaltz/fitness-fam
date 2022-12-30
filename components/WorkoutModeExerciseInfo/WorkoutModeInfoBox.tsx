import { Flex, Text } from '@chakra-ui/react';

export default function WorkoutModeExerciseInfoBox(props: {
  title: string;
  value: string;
}) {
  const { title, value } = props;
  return (
    <Flex flexDir="column" justifyContent="center" key="target">
      <Text fontSize={'lg'} as="span" variant="h3">
        {title}
      </Text>
      <Text fontSize={'md'} as="span" textAlign={'center'}>
        {value}
      </Text>
    </Flex>
  );
}
