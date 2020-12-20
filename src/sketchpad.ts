import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema } from "@graphql-tools/mock";
import { graphqlSync } from "graphql";

export const execute = async ({
  typeDefs,
  query,
}: {
  typeDefs: string;
  query: string;
}) => {
  try {
    const schema = makeExecutableSchema({ typeDefs });
    const schemaWithMocks = addMocksToSchema({ schema });
    const result = graphqlSync(schemaWithMocks, query);

    return JSON.stringify(result, null, 2);
  } catch (err) {
    return err.toString();
  }
};
