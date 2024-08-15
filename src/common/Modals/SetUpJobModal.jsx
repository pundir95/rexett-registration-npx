import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import RexettButton from "../../atomic/RexettButton";
import ReactCanvasConfetti from 'react-canvas-confetti';
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

  const [isVisible, setIsVisible] = useState(false);

  const refAnimationInstance = useRef(null);

  // Set the confetti instance
  const getInstance = useCallback(instance => {
    refAnimationInstance.current = instance;
  }, []);

  // Function to make a confetti shot
  const makeShot = useCallback((particleRatio, opts) => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
    }
  }, []);

  // Fire multiple confetti shots
  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <>

      <Modal show={show} onHide={handleClose} centered className="custom-modal">
        <Modal.Header closeButton className="border-0 pb-3"></Modal.Header>

        <Modal.Body>
          <ReactCanvasConfetti
            refConfetti={getInstance}
            style={{
              position: 'fixed',
              pointerEvents: 'none',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              zIndex: 999,
            }}
          />
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
                  className="main-btn px-4 mr-2"
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
