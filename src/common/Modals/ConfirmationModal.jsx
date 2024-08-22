import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import { clientDeleteHoliday, getClientHolidayList } from "../../../redux/slices/clientDataSlice";
import { useDispatch } from "react-redux";
import RexettButton from "../../atomic/RexettButton";
const ConfirmationModal = ({ submitText="Yes",text,show, handleClose,onClick ,handleAction,smallLoader,type,startDate,endDate}) => {
    const callBackBtn=(e )=>{
        let data={
            status: type,
        }
        onClick(e,data)
    }
    // const handleAction = () => {

    // }
    return(
        <Modal show={show} onHide={handleClose} centered animation className="custom-modal" noValidate> 
            <Modal.Header closeButton className="border-0 pb-3">
            {/* <Modal.Title>End Job</Modal.Title> */}
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label className="d-block text-center">{text}</Form.Label>
                    </Form.Group>
                    <div className="text-center">
                        <RexettButton
                            type="button"
                            text={submitText ? submitText : "Yes"}
                            onClick={type ? callBackBtn : handleAction}
                            // onClick={callBackBtn}
                            className="main-btn px-4 me-3 font-14 fw-semibold"
                            variant="transparent"
                            disabled={smallLoader}
                            isLoading={smallLoader}
                        />
                        <Button variant="transparent" onClick={handleClose} disabled={smallLoader} className="outline-main-btn font-14 fw-semibold bg-transparent border-black text-black px-4" >No</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}
export default ConfirmationModal;