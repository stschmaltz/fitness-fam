import { exerciseTypeDefs } from './exercises';
import { queryResolver, queryTypeDefs } from './query';
import { userTypeDefs } from './user';

const typeDefs = [exerciseTypeDefs, queryTypeDefs, userTypeDefs];
const resolvers = [queryResolver];

export { typeDefs, resolvers };
