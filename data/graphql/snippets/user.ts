import { fullRoutine } from './routine';
import { RoutineObject } from '../../../types/routine';

const fullUser = `{ _id, email, routines { ${fullRoutine} } }`;

export interface ApiUser {
  _id: string;
  email: string;
  routines: RoutineObject[];
}

export { fullUser };
