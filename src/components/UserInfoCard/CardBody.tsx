import React from "react";

import { Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

import { UserInfo } from "../../type/user";

interface Props {
  user: UserInfo;
}

const CardBody: React.FC<Props> = ({ user }) => {
  return (
    <Card.Body className="mt-5">
      <Card.Title>{user.name}</Card.Title>

      <Card.Text>
        <label className="d-flex align-items-center text-secondary info-text">
          <Icon.Telephone />
          <span>{user.email}</span>
        </label>

        <label className="d-flex align-items-center text-secondary info-text">
          <Icon.Envelope />
          <span>{user.phone}</span>
        </label>

        <label className=" d-flex align-items-center text-secondary info-text">
          <Icon.Globe2 />
          <span>{user.website}</span>
        </label>
      </Card.Text>
    </Card.Body>
  );
};

export default CardBody;
