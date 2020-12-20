import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import outdent from "outdent";
import App from "./App";

it("displays the result", async () => {
  render(<App />);

  userEvent.clear(screen.getByLabelText("Schema"));
  userEvent.type(
    screen.getByLabelText("Schema"),
    outdent`
      type Query {
        example: String!
      }
    `
  );

  userEvent.clear(screen.getByLabelText("Query"));
  userEvent.type(
    screen.getByLabelText("Query"),
    outdent`
      query {
        example
      }
    `
  );

  userEvent.clear(screen.getByLabelText("Mocks"));
  userEvent.type(
    screen.getByLabelText("Mocks"),
    outdent`
      const mocks = {
        Query: () => ({
          example: () => "A mocked field",
        }),
      };
    `
  );

  await waitFor(() => {
    expect(screen.getByLabelText("Result")).toHaveValue(
      outdent`
        {
          "data": {
            "example": "A mocked field"
          }
        }
      `
    );
  });
});

it("handles schema errors", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText("Schema"), "invalid schema");

  await waitFor(() => {
    expect(screen.getByLabelText("Result")).toHaveTextContent(/Syntax Error/);
  });
});

it("handles query errors", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText("Query"), "invalid query");

  await waitFor(() => {
    expect(screen.getByLabelText("Result")).toHaveTextContent(/Syntax Error/);
  });
});

it("handles mocking errors", async () => {
  render(<App />);

  userEvent.type(screen.getByLabelText("Mocks"), "invalid mocks");

  await waitFor(() => {
    expect(screen.getByLabelText("Result")).toHaveTextContent(/SyntaxError/);
  });
});
