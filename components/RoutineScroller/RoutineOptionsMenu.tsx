import { EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import DeleteMenuItem from './DeleteMenuItem';
import { theme } from '../../styles/theme';

export default function RoutineOptionsMenu(props: {
  routineId: string;
  onDeleteRoutine: (routineId: string) => Promise<void>;
}) {
  const router = useRouter();
  const { routineId, onDeleteRoutine } = props;

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
        <DeleteMenuItem
          routineId={routineId}
          onDeleteRoutine={onDeleteRoutine}
        />
        <MenuItem
          onClick={() => router.push(`/edit-routine/${routineId}`)}
          bgColor={'inherit'}
          icon={<EditIcon color={theme.colors.brandSecondary['600']} />}
        >
          Edit Routine
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
