import { createYoga, createSchema } from "graphql-yoga";
import { queryResolver, queryTypeDefs } from "../../graphql/query";
import { userTypeDefs } from "../../graphql/user";

const schema = createSchema({
  typeDefs: [userTypeDefs, queryTypeDefs],
  resolvers: [queryResolver],
});

export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: "/api/graphql",
});
