import React, { useEffect, useState } from "react";
import outdent from "outdent";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { execute } from "comlink-loader?singleton=true!./sketchpad";
import "./App.css";

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

export const serialize = (object: Object) => btoa(JSON.stringify(object));
export const deserialize = (string: string) => JSON.parse(atob(string));

const App = () => {
  const [typeDefs, setTypeDefs] = useState(initialTypeDefs);
  const [query, setQuery] = useState(initialQuery);
  const [mocks, setMocks] = useState(initialMocks);
  const [result, setResult] = useState("");

  useEffect(() => {
    try {
      const data = deserialize(window.location.hash.slice(1));

      setTypeDefs(data.typeDefs);
      setQuery(data.query);
      setMocks(data.mocks);
    } catch (err) {}
  }, []);

  useEffect(() => {
    execute({ typeDefs, query, mocks }).then(setResult);
    window.location.replace("#" + serialize({ typeDefs, query, mocks }));
  }, [typeDefs, query, mocks]);

  return (
    <div className="App-sketchpad">
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
