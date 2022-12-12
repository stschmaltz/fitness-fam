import { exerciseTypeDefs } from './exercises';
import { mutationResolver, mutationTypeDefs } from './mutation';
import { queryResolver, queryTypeDefs } from './query';
import { routineResolver, routineTypeDefs } from './routine';
import { userTypeDefs } from './user';

const typeDefs = [
  mutationTypeDefs,
  queryTypeDefs,
  exerciseTypeDefs,
  userTypeDefs,
  routineTypeDefs,
];
const resolvers = [queryResolver, routineResolver, mutationResolver];

export { typeDefs, resolvers };
