import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";

const RegistrationStepModal = ({ show, role,handleClose, nextStep }) => {
  const navigate = useNavigate()
  const redirectToLogin = () => {
    if(role="vendor"){
      window.location.href = "https://rexett-frontend.rvtechnologies.info/vendor-login"
    }else{
       window.location.href = "https://rexett-frontend.rvtechnologies.info/developer-login"
    }
  }

  let currentStep = localStorage.getItem('clientActiveStep');

  return (
    <>
      <Modal show={show} onHide={handleClose} className="pb-3">
        <Modal.Header closeButton className="border-0 pb-3">
        </Modal.Header>
        <Modal.Body>
          {currentStep === '7' ?
            <>
              <h5>Welcome to the Rexett Community!</h5>
              <p>
                A Rexett Family Team Member Will Reach Out to You Shortly for the Next
                Steps!
              </p>
            </> :
            <>
              <h3>Your Registration has been completed</h3>
              <h3>Do you want to continue your registration process?</h3>
            </>
          }

        </Modal.Body>
        <div className="d-flex justify-content-end align-items-center p-3">
          <div className="me-3">
            <RexettButton
              onClick={redirectToLogin}
              text="Login"
              className="main-btn px-5 mr-2"
            />
          </div>
          {/* {currentStep !== '7' &&
            <div>
              <RexettButton
                text="Continue"
                onClick={nextStep}
                className="main-btn px-5 mr-2"
              />
            </div>
          } */}
        </div>
      </Modal>
    </>
  )
}
export default RegistrationStepModal;