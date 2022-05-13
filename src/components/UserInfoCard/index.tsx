import React, { useState } from "react";

import { Col, Card } from "react-bootstrap";

import CardFooter from "./CardFooter";
import CardBody from "./CardBody";
import CardBanner from "./CardBanner";
import CardEditModal from "./CardEditModal";
import ToastAction from "../Toast";

import { useAppDispatch } from "../../store/hooks";
import { deleteUser } from "../../store/user";
import { UserInfo } from "../../type/user";
import "./style.css";

interface Props {
  user: UserInfo;
}

const UserInfoCard: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const [favorite, setFavorite] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const message = "User is successfully deleted";

  const onClickTrash = () => {
    dispatch(deleteUser(user));
    setShow(true);
  };

  return (
    <>
      <Col xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardBanner user={user}></CardBanner>

          <CardBody user={user}></CardBody>

          <CardFooter
            favorite={favorite}
            setFavorite={setFavorite}
            onClickTrash={onClickTrash}
            onClickEdit={() => setEditModalOpen(true)}
          />
        </Card>
      </Col>

      <CardEditModal
        user={user}
        show={editModalOpen}
        onHide={() => setEditModalOpen(false)}
      />

      <ToastAction
        show={show}
        onClose={() => setShow(false)}
        message={message}
      />
    </>
  );
};

export default UserInfoCard;
