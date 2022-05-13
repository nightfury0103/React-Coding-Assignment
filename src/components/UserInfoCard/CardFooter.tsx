import React from "react";

import { Card, Row, Col } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

interface Props {
  favorite: boolean;
  setFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  onClickTrash: () => void;
  onClickEdit: () => void;
}

const CardFooter: React.FC<Props> = ({
  favorite,
  setFavorite,
  onClickTrash,
  onClickEdit,
}) => {
  return (
    <Card.Footer className="text-muted border-0 bg-transparent">
      <Row>
        <Col className="text-center">
          {favorite && (
            <Icon.HeartFill
              aria-label="favorite"
              onClick={() => setFavorite(false)}
            />
          )}
          {!favorite && (
            <Icon.Heart
              aria-label="unfavorite"
              onClick={() => setFavorite(true)}
            />
          )}
        </Col>
        <Col className="text-center">
          <Icon.PencilSquare aria-label="edit" onClick={onClickEdit} />
        </Col>
        <Col className="text-center">
          <Icon.TrashFill aria-label="trash" onClick={onClickTrash} />
        </Col>
      </Row>
    </Card.Footer>
  );
};

export default CardFooter;
