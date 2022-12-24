import {
  ArmsIcon,
  BackIcon,
  CardioIcon,
  ChestIcon,
  CoreIcon,
  LegsIcon,
  NeckIcon,
  ShouldersIcon,
} from '../Icons';

export enum BODY_AREA {
  ARMS = 'Arms',
  BACK = 'Back',
  CARDIO = 'Cardio',
  CHEST = 'Chest',
  CORE = 'Core',
  LEGS = 'Legs',
  NECK = 'Neck',
  SHOULDERS = 'Shoulders',
}

const BodyAreaToIconMap: Record<
  BODY_AREA,
  { alt: string; src: string; color: string; icon?: JSX.Element }
> = {
  [BODY_AREA.ARMS]: {
    alt: 'arm-icon',
    src: '/icons/arm-highlight.svg',
    color: 'primary',
    icon: <ArmsIcon color="primary" w={25} h={25} fill="red" />,
  },
  [BODY_AREA.BACK]: {
    alt: 'back-icon',
    src: '/icons/back-highlight.svg',
    color: 'secondary',
    icon: <BackIcon color="secondary" w={30} h={30} />,
  },
  [BODY_AREA.CARDIO]: {
    alt: 'cardio-icon',
    src: '/icons/cardio-highlight.svg',
    color: 'purple',
    icon: <CardioIcon color="purple" w={30} h={30} />,
  },
  [BODY_AREA.CHEST]: {
    alt: 'chest-icon',
    src: '/icons/chest-highlight.svg',
    color: 'green',
    icon: <ChestIcon color="thirdAccent" w={30} h={30} />,
  },
  [BODY_AREA.CORE]: {
    alt: 'core-icon',
    src: '/icons/core-highlight.svg',
    color: 'teal',
    icon: <CoreIcon color="teal" w={30} h={30} />,
  },
  [BODY_AREA.LEGS]: {
    alt: 'legs-icon',
    src: '/icons/legs-highlight.svg',
    color: 'purple',
    icon: <LegsIcon color="secondAccent" w={25} h={25} />,
  },
  [BODY_AREA.NECK]: {
    alt: 'neck-icon',
    src: '/icons/neck-highlight.svg',
    color: 'blue',
    icon: <NeckIcon color="blue" w={30} h={30} />,
  },
  [BODY_AREA.SHOULDERS]: {
    alt: 'shoulders-icon',
    src: '/icons/shoulders-highlight.svg',
    color: 'red',
    icon: <ShouldersIcon color="gray" w={30} h={30} />,
  },
};

export { BodyAreaToIconMap };
