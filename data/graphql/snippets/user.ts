import { fullRoutine } from './routine';

const baseUserQuery = `{me { email, routines  ${fullRoutine} } }`;

export { baseUserQuery };
