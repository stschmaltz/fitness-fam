import { createSchema, createYoga } from 'graphql-yoga';
import { resolvers, typeDefs } from '../../data/graphql';

const schema = createSchema({
  typeDefs,
  resolvers,
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
  maskedErrors: true,
});
