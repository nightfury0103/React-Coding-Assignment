import React from "react";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { UserInfo } from "../../type/user";
import CardEditModal from "./CardEditModal";
import CardBody from "./CardBody";
import CardBanner from "./CardBanner";
import CardFooter from "./CardFooter";

import { profile_background_url } from "../../config/constants";

const userInfo: UserInfo = {
  name: "Eric Smith",
  email: "ericsmith@gmail.com",
  phone: "023-45-769",
  website: "https://ericsmith.com",
  backgroundNum: 80,
};

test("rendering and submitting a basic Formik form", async () => {
  const onHide = jest.fn();

  render(
    <Provider store={store}>
      <CardEditModal user={userInfo} show={true} onHide={onHide} />
    </Provider>
  );

  const usernameInput = screen.getByLabelText(/username:/i);
  const emailInput = screen.getByLabelText(/email:/i);
  const phoneInput = screen.getByLabelText(/phone:/i);
  const websiteInput = screen.getByLabelText(/website:/i);
  await act(async () => {
    await fireEvent.change(usernameInput, {
      target: { value: userInfo.name },
    });
    await fireEvent.change(emailInput, {
      target: { value: userInfo.email },
    });
    await fireEvent.change(phoneInput, {
      target: { value: userInfo.phone },
    });
    await fireEvent.change(websiteInput, {
      target: { value: userInfo.website },
    });
  });
  expect(usernameInput.getAttribute("value")).toEqual(userInfo.name);
  expect(emailInput.getAttribute("value")).toEqual(userInfo.email);
  expect(phoneInput.getAttribute("value")).toEqual(userInfo.phone);
  expect(websiteInput.getAttribute("value")).toEqual(userInfo.website);

  act(() => {
    fireEvent(
      screen.getByText("Edit"),
      new MouseEvent("click", {
        bubbles: true,
      })
    );
  });
});

test("rendering card body with user info", async () => {
  render(<CardBody user={userInfo} />);

  expect(screen.getByText(/eric smith/i)).toBeInTheDocument();
  expect(screen.getByText(/ericsmith@gmail.com/i)).toBeInTheDocument();
  expect(screen.getByText(/023-45-769/i)).toBeInTheDocument();
  expect(screen.getByText(/ericsmith.com/i)).toBeInTheDocument();
});

test("rendering card banner with user info", async () => {
  render(<CardBanner user={userInfo} />);

  const bannerImage = screen.getByAltText(/banner/i);
  const avatarImage = screen.getByAltText(/avatar/i);

  expect(bannerImage.getAttribute("src")).toEqual(
    `${profile_background_url}${userInfo.backgroundNum}`
  );

  expect(avatarImage.getAttribute("src")).toEqual(
    `https://avatars.dicebear.com/v2/avataaars/{{${userInfo.name}}}.svg?options[mood][]=happy`
  );
});

test("rendering card footer", async () => {
  const setFavorite = jest.fn();
  const onClickTrash = jest.fn();
  const onClickEdit = jest.fn();

  render(
    <CardFooter
      favorite={true}
      setFavorite={setFavorite}
      onClickTrash={onClickTrash}
      onClickEdit={onClickEdit}
    />
  );

  // get favorite button and trigger click on it
  const favoriteIconButton = screen.getByLabelText("favorite");
  expect(favoriteIconButton).toBeInTheDocument();

  act(() => {
    favoriteIconButton.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });

  expect(setFavorite).toHaveBeenCalledTimes(1);
  await waitFor(() => expect(setFavorite).toHaveBeenCalledWith(false));

  // check if edit and trash button exist
  const editIconButton = screen.getByLabelText("edit");
  expect(editIconButton).toBeInTheDocument();

  const trashIconButton = screen.getByLabelText("trash");
  expect(trashIconButton).toBeInTheDocument();
});
