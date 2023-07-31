import { render, screen } from "@testing-library/react";
import Snackbar from "../components/snackbar";

test("renders the snackbar component with the provided message", () => {
  const message = "This is a snackbar message";
  const isVisible = true;
  const setIsVisible = jest.fn();

  render(
    <Snackbar
      message={message}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  );

  const snackbarElement = screen.getByText(message);
  expect(snackbarElement).toBeInTheDocument();
});

test("shows the snackbar component", () => {
  const message = "This is a snackbar message";
  const isVisible = true;
  const setIsVisible = jest.fn();

  render(
    <Snackbar
      message={message}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  );

  let snackbarElement = screen.getByText(message);
  expect(snackbarElement).toBeInTheDocument();
});
