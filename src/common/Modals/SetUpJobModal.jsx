import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";
const SetUpJobModal = ({
  show,
  handleRedirect,
  handleClose,
  handleProceed,
  smallLoader,
  modalData,
  activeStep,
}) => {
  let { heading, paragraph } = modalData;
  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <h3 className="popup-heading">{heading}</h3>
          <p className="text-center font-14">{paragraph}</p>
          <div className="d-flex justify-content-center align-items-center mt-3 gap-3">
            {activeStep == 1 ? (
              <>
                <Button
                  variant="transparent"
                  onClick={handleClose}
                  className="outline-main-btn font-14 text-decoration-none rounded-3"
                >
                  Cancel
                </Button>
                <RexettButton
                  type="button"
                  text={"Proceed"}
                  onClick={handleProceed}
                  className="main-btn px-5 mr-2"
                  disabled={smallLoader}
                  isLoading={smallLoader}
                />
              </>
            ) : (
              <Link
                to={"#"}
                variant="transparent"
                onClick={handleRedirect}
                className="outline-main-btn font-14 text-decoration-none rounded-3"
              >
                Login
              </Link>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default SetUpJobModal;
