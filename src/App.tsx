import React, { useEffect } from "react";

import { Container, Row, Spinner } from "react-bootstrap";

import UserInfoCard from "./components/UserInfoCard";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { getUsersList } from "./store/user";
import { UserInfo } from "./type/user";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const users: UserInfo[] = useAppSelector((state) => state.user.users);
  const loading: boolean = useAppSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getUsersList());
  }, []);

  return (
    <Container>
      <p className="h2">
        Available for favorite, edit and delete functionality
      </p>
      {/* displays loading status when getting list of users */}
      {loading && (
        <div className="d-flex flex-column align-items-center spinner">
          <Spinner animation="border" role="status" />
          <span>Loading...</span>
        </div>
      )}

      {!loading && users && (
        <Row className="g-4">
          {users.map((user: UserInfo, key: number) => (
            <UserInfoCard key={key} user={user} />
          ))}
        </Row>
      )}

      {/* displays when there aren't any users */}
      {!loading && (!users || users.length === 0) && (
        <p className="h1 my-5">There aren't any users</p>
      )}
    </Container>
  );
};

export default App;
