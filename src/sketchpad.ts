import { makeExecutableSchema } from "@graphql-tools/schema";
import { addMocksToSchema, MockList } from "@graphql-tools/mock";
import { graphqlSync } from "graphql";
import faker from "faker";

(global as any).faker = faker;
(global as any).MockList = MockList;

export const execute = async ({
  typeDefs,
  query,
  mocks,
}: {
  typeDefs: string;
  query: string;
  mocks: string;
}) => {
  try {
    const schema = makeExecutableSchema({ typeDefs });
    const schemaWithMocks = addMocksToSchema({
      schema,
      // eslint-disable-next-line no-eval
      mocks: eval(`${mocks}; (mocks)`),
    });
    const result = graphqlSync(schemaWithMocks, query);

    return JSON.stringify(result, null, 2);
  } catch (err) {
    return err.toString();
  }
};
