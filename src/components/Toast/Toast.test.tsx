import React from "react";
import { render, screen } from "@testing-library/react";

import Toast from "./index";

test("rendering toast when the deleting action is happened", async () => {
  const onClose = jest.fn();

  render(
    <Toast
      show={true}
      onClose={onClose}
      message="The user is successfully deleted"
    />
  );

  expect(
    screen.getByText(/the user is successfully deleted/i)
  ).toBeInTheDocument();
});
