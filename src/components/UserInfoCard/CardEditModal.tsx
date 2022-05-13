import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import { Modal, Button, Form } from "react-bootstrap";

import ToastAction from "../Toast";
import { useAppDispatch } from "../../store/hooks";
import { updateUser } from "../../store/user";
import { UserInfo } from "../../type/user";

interface Props {
  user: UserInfo;
  show: boolean;
  onHide: () => void;
}

const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
  phone: yup.string().required(),
  website: yup.string().required(),
});

const CardEditModal: React.FC<Props> = ({ user, show, onHide }) => {
  const dispatch = useAppDispatch();

  const [showToast, setShowToast] = useState<boolean>(false);
  const message = "User is successfully updated";

  const initialValues = {
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
    backgroundNum: user.backgroundNum,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: UserInfo, actions) => {
      onHide();
      dispatch(updateUser({ values, user }));
      setShowToast(true);
      actions.resetForm({
        values: {
          ...values,
        },
      });
    },
  });

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User's Information
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label htmlFor="name">Username:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Eric Smith"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger">{formik.errors.name}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="ericksmith@gmail.com"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="phone">Phone:</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                id="phone"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="234-25-456"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-danger">{formik.errors.phone}</div>
              ) : null}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label htmlFor="website">Website:</Form.Label>
              <Form.Control
                type="url"
                name="website"
                id="website"
                value={formik.values.website}
                onChange={formik.handleChange}
                placeholder="https://erithsmith.com"
              />
              {formik.touched.website && formik.errors.website ? (
                <div className="text-danger">{formik.errors.website}</div>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Edit
            </Button>

            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastAction
        show={showToast}
        onClose={() => setShowToast(false)}
        message={message}
      />
    </>
  );
};

export default CardEditModal;
