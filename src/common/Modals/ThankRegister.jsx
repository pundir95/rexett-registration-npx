import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
const ThankRegister = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Thank you for applying</h3>
                    <p className="text-center">"Welcome to the Rexett Community!"</p>
                    <p className="text-center">A Rexett Team Member Will Reach Out to You Shortly for the Next Steps!</p>
                    <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
                        <Link to={'#'} variant="transparent" onClick={handleClose} className="outline-main-btn font-14 text-decoration-none rounded-3">Back to home</Link>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default ThankRegister;