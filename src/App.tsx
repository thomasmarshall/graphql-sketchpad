import React, { useEffect, useState } from "react";
import outdent from "outdent";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror-graphql/mode";
// eslint-disable-next-line import/no-webpack-loader-syntax
import { execute } from "comlink-loader?singleton=true!./sketchpad";
import "./App.css";

const initialTypeDefs = outdent`
  # GraphQL Sketchpad is a tool for quickly sketching out GraphQL APIs
  # https://github.com/thomasmarshall/graphql-sketchpad

  # Design your schema here

  type Query {
    example: String!
    users: [User!]!
  }

  type User {
    name: String!
    email: String!
    comments: [Comment!]!
  }

  type Comment {
    body: String!
  }
`;

const initialQuery = outdent`
  # Perform queries/mutations against the schema

  query {
    example
    users {
      name
      email
      comments {
        body
      }
    }
  }
`;

const initialMocks = outdent`
  // Add custom mock resolvers

  const mocks = {
    Query: () => ({
      example: () => faker.random.words(2),
    }),
    User: () => ({
      name: () => "Alex Smith",
      email: () => "alex.smith@example.com",
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
      <CodeMirror
        options={{
          screenReaderLabel: "Schema",
          mode: "graphql",
          lineNumbers: true,
        }}
        value={typeDefs}
        onBeforeChange={(editor, data, value) => setTypeDefs(value)}
      />
      <CodeMirror
        options={{
          screenReaderLabel: "Query",
          mode: "graphql",
          lineNumbers: true,
        }}
        value={query}
        onBeforeChange={(editor, data, value) => setQuery(value)}
      />
      <CodeMirror
        options={{
          screenReaderLabel: "Mocks",
          mode: "javascript",
          lineNumbers: true,
        }}
        value={mocks}
        onBeforeChange={(editor, data, value) => setMocks(value)}
      />
      <CodeMirror
        options={{
          screenReaderLabel: "Result",
          mode: { name: "javascript", json: true },
          lineNumbers: true,
          readOnly: true,
        }}
        value={result}
        onBeforeChange={() => null}
      />
    </div>
  );
};

export default App;
