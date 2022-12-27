import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  // Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import DeleteMenuItem from './DeleteMenuItem';
import { theme } from '../../styles/theme';
import { RoutineObject } from '../../types/routine';
// import { ArmsIcon } from '../Icons';

export default function RoutineOptionsMenu(props: {
  routine: RoutineObject;
  onDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const router = useRouter();
  const { routine, onDeleteRoutine } = props;

  return (
    <Menu>
      <MenuButton
        bgColor={theme.colors.accent1['100']}
        aria-label="Options"
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList
        bgColor={theme.colors.accent1['100']}
        borderColor={theme.colors.accent1['700']}
        borderWidth={1.4}
      >
        {/* <MenuItem
          onClick={() => router.push(`/workout/${routine._id.toString()}`)}
          bgColor={'inherit'}
          icon={<ArmsIcon color={theme.colors.brandSecondary['600']} />}
        >
          <Text
            fontWeight={'semibold'}
            fontSize={'lg'}
            color={theme.colors.brandSecondary['500']}
          >
            Start Workout Mode
          </Text>
        </MenuItem> */}
        <MenuItem
          onClick={() => router.push(`/edit-routine/${routine._id.toString()}`)}
          bgColor={'inherit'}
          icon={<EditIcon color={theme.colors.brandSecondary['600']} />}
        >
          Edit Routine
        </MenuItem>
        <DeleteMenuItem routine={routine} onDeleteRoutine={onDeleteRoutine} />
      </MenuList>
    </Menu>
  );
}
