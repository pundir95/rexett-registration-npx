import React from 'react'
import { Modal } from 'react-bootstrap'
import RexettButton from '../../atomic/RexettButton'

function CommonModal({show , handleClose}) {
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0 pb-3">
        </Modal.Header>
        <Modal.Body>
            <Input/>
            <RexettButton/>
                {/* {currentStep === '7' ? 
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
                } */}

                </Modal.Body>
        </Modal>
    </div>
  )
}

export default CommonModal