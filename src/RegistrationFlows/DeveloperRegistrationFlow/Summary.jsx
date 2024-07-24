import {useEffect} from "react";
import { Button, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { FaChevronDown, FaLightbulb, FaPencil } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { Link } from "react-router-dom";
import StepperHeadingSection from "../StepperHeadingSection";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../../common/Modals/ConfirmationModal";
import { getDeveloperProfileDetails } from "../../Redux/Slices/DeveloperDataSlice";

const Summary = ({
  nestedActiveStep,
  stepData,
  handleDelete,
  handleCloseUploadFileModal,
  smallLoader,
  setShowSetUpJobModal,
  showSetUpModal,
  addAnotherPosition,
  activeStep,
  type,
  editSummary,
  objectKeys,
}) => {

  const dispatch = useDispatch();

  let developerId=localStorage.getItem("developerId");

  useEffect(()=>{
    if(developerId){
        dispatch(getDeveloperProfileDetails(developerId));
    }
  
},[developerId])

  const handleDeleteModal = (id) => {
    setShowSetUpJobModal({
      isDelete: true,
      deletedId: id,
    });
  };
  const tipstext = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Expert Insights</Popover.Header>
      <Popover.Body>
        {/* <p className="font-14 mb-2">Short cut: If you don’t have time to tailor your entire resume for a specific job application, at least change this section so that it matches the opportunity.</p> */}
        <ul className="ps-3 mb-0 tip-listing">
          <li className="font-12">
            Write a career overview so that hiring managers can immediately see
            the value that you bring.
          </li>
          <li className="font-12">
            Not sure how to write this? Choose one of our examples and edit it
            to match your background.
          </li>
          <li className="font-12">
            Make your summary sound stronger by writing it in the present tense.
            Focus on what you can do for a company, rather than what you did in
            the past.
          </li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const populateHeaderItem = (item) => {
    if (item.job_title) {
      return ` ${item.job_title} , ${item.company_name}`;
    } else if (item.university_name) {
      return ` ${item.university_name} , ${item.field_of_study}`;
    } else if (item?.project_title) {
      return ` ${item.project_title} , ${item.role_in_project}`;
    }
  };

  const getAddress = (item) => {
    if (item?.project_title) {
      return (
        <span>
          {`${item?.project_type} , ${item?.project_start_date} - ${item?.project_end_date}`}
          <br />
          <span>{item?.project_link}</span>
        </span>
      );
    }else if(item?.job_title){
      return <span>{`${item?.job_location} | ${item?.start_date?.slice(0,10)} - ${item?.end_date?.slice(0,10)}`}</span> 
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <StepperHeadingSection
                activeStep={activeStep}
                nestedActiveStep={nestedActiveStep}
                type={type}
              />
              <div>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={tipstext}
                >
                  <span className="text-green d-flex align-items-center gap-2 cursor-pointer">
                    <FaLightbulb />
                    Tips
                  </span>
                </OverlayTrigger>
              </div>
            </div>
          </div>
          {stepData?.map((item, index) => {
            return (
              <>
                <div className="work-summary-wrapper mb-3 position-relative">
                  <div className="w-100">
                    <h4 className="summary-heading mb-2 fw-semibold">
                      {populateHeaderItem(item)}
                    </h4>
                    <p className="font-14">{getAddress(item)}</p>
                    <ul>
                      <li
                        className="font-14"
                        dangerouslySetInnerHTML={{
                          __html:
                            item?.description || item?.project_description,
                        }}
                      ></li>
                    </ul>
                    <div className="d-flex align-items-center justify-content-between mt-4">
                      {/* <Link className="text-decoration-none text-green font-14">
                        <FaPencil /> Edit description
                      </Link> */}
                      <Link className="text-decoration-none text-green font-14">
                        Show more detail <FaChevronDown />
                      </Link>
                    </div>
                  </div>
                  <div className="education-action">
                    <Button
                      onClick={() => editSummary(item?.id)}
                      variant="transparent"
                      className="arrow-btn info-arrow shadow-none"
                    >
                      <TiEdit />
                    </Button>
                    <Button
                      onClick={() => handleDeleteModal(item?.id)}
                      variant="transparent"
                      className="arrow-btn danger-arrow shadow-none"
                    >
                      <IoCloseOutline />
                    </Button>
                  </div>
                </div>
              </>
            );
          })}

          <div className="">
            <Button
              variant="transparent"
              className="position-btn mb-3"
              onClick={addAnotherPosition}
            >
              + Add another position
            </Button>
          </div>
        </Col>
      </Row>
      <ConfirmationModal
        text={"Are you sure to delete this job?"}
        show={showSetUpModal?.isDelete}
        handleClose={handleCloseUploadFileModal}
        onClick={handleDelete}
        smallLoader={smallLoader}
      />
    </>
  );
};

export default Summary;
