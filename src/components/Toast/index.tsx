import React from "react";

import { Toast, ToastContainer } from "react-bootstrap";

interface Props {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ToastAction: React.FC<Props> = ({ show, message, onClose }) => {
  return (
    <ToastContainer position="top-end" style={{ zIndex: 100 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Alert</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastAction;
