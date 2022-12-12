import { fullRoutine } from './routine';

const baseUserQuery = `{me { name, routines  ${fullRoutine} } }`;

export { baseUserQuery };
