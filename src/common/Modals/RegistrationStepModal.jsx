import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
// import { FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
// import { FiExternalLink } from "react-icons/fi";
// import { GoClockFill } from "react-icons/go";
// import { MdLocalPhone, MdLocationPin, MdWork } from "react-icons/md";
// import resumeImg from '../../../../assets/img/demo-img.jpg'
// import FinalizeResume from "../../admin/ResumeSteps/FinalizeResume";
import { useNavigate } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";

const RegistrationStepModal = ({ show, handleClose,nextStep }) => {
    const navigate=useNavigate()
    const redirectToLogin=()=>{
        navigate("/developer-login")

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>
                <Modal.Body>
                <h3>Your Registration has been completed</h3>
                <h3>Do you want to continue your registration process?</h3>  
                 
                </Modal.Body>
                <div className="d-flex justify-content-end align-items-center ">
              <div className="me-3">
                <RexettButton
                onClick={redirectToLogin}
                  text="Login"
                  className="main-btn px-5 mr-2"
                />
              </div>
              <div>
                <RexettButton
                  text="Continue"
                  onClick={nextStep}
                  className="main-btn px-5 mr-2"
                />
              </div>
            </div>
            </Modal>
        </>
    )
}
export default RegistrationStepModal;