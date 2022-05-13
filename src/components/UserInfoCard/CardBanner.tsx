import React from "react";

import { Card, Image } from "react-bootstrap";

import { profile_background_url } from "../../config/constants";
import { UserInfo } from "../../type/user";

interface Props {
  user: UserInfo;
}

const CardBanner: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <div className="upper">
        <Card.Img
          variant="top"
          src={`${profile_background_url}${user.backgroundNum}`}
          className="image-fluid"
          alt="banner"
        />
      </div>

      <div className="user text-center">
        <div className="profile">
          <Image
            src={`https://avatars.dicebear.com/v2/avataaars/{{${user.name}}}.svg?options[mood][]=happy`}
            roundedCircle
            width="80"
            alt="avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default CardBanner;
