import React from "react";
import { Button, Modal } from "react-bootstrap";
const RecomdModal = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <h3 className="popup-heading">Expert recommendations for <strong>Web Developer</strong></h3>
                    <p className="text-center">You can edit these in next step.</p>
                    <ul className="skill-recomd ps-3 font-14">
                        <li className="mb-2">
                            Self-motivated, with a strong sense of personal responsibility.
                        </li>
                        <li className="mb-2">
                            Excellent communication skills, both verbal and written.
                        </li>
                        <li className="mb-2">
                            Proven ability to learn quickly and adapt to new situations.
                        </li>
                        <li className="mb-2">
                            Skilled at working independently and collaboratively in a team environment.
                        </li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <Button variant="transparent" onClick={handleClose} className="outline-main-btn font-14">No Thanks</Button>
                        <Button variant="transparent" onClick={handleClose} className="main-btn font-14">Add recommendations</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default RecomdModal;