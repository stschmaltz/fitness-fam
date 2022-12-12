import { fullRoutine } from './routine';
import { RoutineObject } from '../../../types/routine';

const baseUserQuery = `{me { email, routines  ${fullRoutine} } }`;
const fullUser = `{ _id, email, routines  ${fullRoutine} }`;

export interface ApiUser {
  _id: string;
  email: string;
  routines: RoutineObject[];
}

export { baseUserQuery, fullUser };
