import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
const CertificateUpload = ({ show, handleClose }) => {
    return(
        <Modal show={show} onHide={handleClose} centered animation size="lg" className="custom-modal">
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Upload Certificate</h3>
                <Form>
                    <div className="experience-container">
                        <Row>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Name *</Form.Label>
                                <Form.Control type="text" className="common-field font-14" placeholder="E.g. Microsoft  certified network associate" />
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Issuing organization *</Form.Label>
                                <Form.Control type="text" className="common-field font-14" placeholder="E.g. Microsoft" />
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Issue date *</Form.Label>
                                <Form.Control type="date" className="common-field font-14" placeholder="E.g. Microsoft" />
                            </Col>
                            <Col md="6" className="mb-3">
                                <Form.Label className="font-14">Expiration date *</Form.Label>
                                <Form.Control type="date" className="common-field font-14" placeholder="E.g. Microsoft" />
                            </Col>
                            <Col md="12">
                                <Form.Label className="font-14">Add certification file *</Form.Label>
                                <input type="file" className="d-none" id="media-file" />
                                <Form.Label htmlFor="media-file" className="position-btn text-center cursor-pointer">
                                    Upload file 
                                </Form.Label>
                            </Col>
                        </Row>
                    </div>
                    <div className="text-center mt-4">
                        <Button variant="transparent" className="main-btn px-4 font-14 fw-semibold">Submit</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default CertificateUpload;