import { exerciseTypeDefs } from './exercises';
import { queryResolver, queryTypeDefs } from './query';
import { routineResolver, routineTypeDefs } from './routine';
import { userTypeDefs } from './user';

const typeDefs = [
  exerciseTypeDefs,
  queryTypeDefs,
  userTypeDefs,
  routineTypeDefs,
];
const resolvers = [queryResolver, routineResolver];

export { typeDefs, resolvers };
