import React from "react";
import { Modal } from "react-bootstrap";
import introVideo from '../../assets/images/interview-video.mp4'
const IntroVideo = ({ show, handleClose,previewImage }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="zoom-modal" className="custom-modal" animation>
                <Modal.Header closeButton className="border-0 p-0 intro-video-close">
                </Modal.Header>

                <Modal.Body className="p-0 bg-transparent">
                    <video className="w-100" controls>
                        <source src={previewImage? previewImage: introVideo} />
                    </video>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default IntroVideo;