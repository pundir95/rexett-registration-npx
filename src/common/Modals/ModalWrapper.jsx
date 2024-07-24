import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";


const ModalWrapper = ({ show, handleClose, children }) => {

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="custom-modal"
      animation
    >
      <Modal.Header closeButton className="border-0 pb-3">
        {/* <Modal.Title>About Section</Modal.Title> */}
      </Modal.Header>


      <Modal.Body>
        {/* <h3 className="popup-heading">{t("aboutSection")}</h3> */}
         {children}
      </Modal.Body>
    </Modal>
  );
};
export default ModalWrapper;
