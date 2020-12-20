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

const App = () => {
  const [typeDefs, setTypeDefs] = useState(initialTypeDefs);
  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState("");

  useEffect(() => {
    execute({ typeDefs, query }).then(setResult);
  }, [typeDefs, query]);

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
      <textarea aria-label="Result" value={result} readOnly />
    </div>
  );
};

export default App;
