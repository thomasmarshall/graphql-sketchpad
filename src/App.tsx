import React, { useEffect, useState } from "react";
import outdent from "outdent";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { execute } from "comlink-loader?singleton=true!./sketchpad";

const initialTypeDefs = outdent`
  type Query {
    example: String!
  }
`;

const initialQuery = outdent`
  query {
    example
  }
`;

const initialMocks = outdent`
  const mocks = {
    Query: () => ({
      example: () => "A mocked field",
    }),
  };
`;

const App = () => {
  const [typeDefs, setTypeDefs] = useState(initialTypeDefs);
  const [query, setQuery] = useState(initialQuery);
  const [mocks, setMocks] = useState(initialMocks);
  const [result, setResult] = useState("");

  useEffect(() => {
    execute({ typeDefs, query, mocks }).then(setResult);
  }, [typeDefs, query, mocks]);

  return (
    <div>
      <textarea
        aria-label="Schema"
        value={typeDefs}
        onChange={(e) => setTypeDefs(e.target.value)}
      />
      <textarea
        aria-label="Query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <textarea
        aria-label="Mocks"
        value={mocks}
        onChange={(e) => setMocks(e.target.value)}
      />
      <textarea aria-label="Result" value={result} readOnly />
    </div>
  );
};

export default App;
