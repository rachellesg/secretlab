import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/footer";

test("renders the Footer component with the correct text", () => {
  render(<Footer />);

  const footerElement = screen.getByText(/Rachelle 2023 for Secretlab/i);
  expect(footerElement).toBeInTheDocument();
});
