import React, { useEffect, useState } from "react";
import { Button, Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import resumeImg from "../../assets/images/user-img.jpg";
import { Link, useLocation } from "react-router-dom";
import { FaEnvelope, FaGithub, FaStar } from "react-icons/fa6";
import { MdEditNote, MdEmail, MdLocalPhone, MdLockClock, MdOutlineOndemandVideo, MdPunchClock, MdWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaLinkedin, FaTimes } from "react-icons/fa";
// import ScreenLoader from "../../atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import ExperienceCV from "../Modals/ExperienceCVModal";
import SocialMediaModal from "../Modals/SocialMediaModal";
import DeveloperDetails from "../Modals/DeveloperDetails";
import RexettButton from "../../atomic/RexettButton";
import { FiExternalLink, FiStar } from "react-icons/fi";
import SingleExperienceCard from "./SingleExperienceCard";
import ProjectsModal from "../Modals/ProjectModal";
// import Cookies from "js-cookie";
import ModalWrapper from "../Modals/ModalWrapper";
import { MdAlternateEmail } from "react-icons/md";
import { GoClockFill } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
import { TbFileDownload } from "react-icons/tb";
// import introVideo from '../../../assets/img/interview-video.mp4'
import { FaCirclePlay } from "react-icons/fa6";
// import IntroVideo from "../Modals/IntroVideo";
import { IoCloseOutline } from "react-icons/io5";
import CertificateUpload from "../Modals/CertificateUpload";
import AboutCV from "../Modals/AboutCvModal";
import EducationCV from "../Modals/EducationCV";
import SkillsModal from "../Modals/SkillCVModal";
import { useTourContext } from "../../crmTour/TourContext";
import { approvedEditAction, getDeveloperDetails, getSkillList, rejectEditAction } from "../../Redux/Slices/ClientDataSlice";
import ExpertiseModal from "../Modals/ExpertiseModal";
import IntroVideo from "../Modals/IntroVideo";

const SingleDeveloper = ({ data, role }) => {
  const { startTour, closeTour } = useTourContext();

  const startAppTour = () => {
    const steps = [
      {
        selector: "#edit",
        content: (
          <>
            <b>Welcome</b> <br /> We have Prepared a short product tour to help
            you get started{" "}
          </>
        ),
      },
      {
        selector: "#edit_1",
        content: <>Edit The Developer Details </>,
      },
      {
        selector: "#edit_2",
        content: (
          <>
            You can create a new skill or add existing skills from the dropdown{" "}
          </>
        ),
      },
      {
        selector: "#edit_3",
        content: <>Add and Edit the expertise according to you skills </>,
      },
      {
        selector: "#edit_4",
        content: <>Add and Edit the new project </>,
      },
      {
        selector: "#edit_5",
        content: <>Add your Bio details at least in 300 characters </>,
      },
      {
        selector: "#edit_6",
        content: <>Add your multiple experience details </>,
      },
      {
        selector: "#edit_7",
        content: <>Add your multiple education details </>,
      },

      // Add more steps as needed
    ];
    startTour(steps);
  };

  const dispatch = useDispatch();
  const { screenLoader, smallLoader } = useSelector(
    (state) => state.clientData
  );
  const [selectedTemplate, setSelectedTemplate] = useState("cv-template1");
  const [developerDetails, setDeveloperDetails] = useState(false);
  const [readmore, setReadMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  let { pathname } = useLocation();
  let userId = pathname.split("/")[2];
  console.log(pathname.split("/")[2], "pathj");
  console.log(data, "data");

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getSkillList());
    // const tourCompletedCookie = Cookies.get("CVtourCompleted");
    // if (tourCompletedCookie === 'true') {
    // startAppTour();
    // }
  }, []);

  const splitSkills = (data) => {
    let skills = data?.skills?.split(",") || data?.split(",");
    return skills;
  };
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const handleShowExperienceModal = () => {
    setShowExperienceModal(true);
  };

  const handleCloseExperienceModal = () => {
    setShowExperienceModal(false);
  };

  const [showEducationModal, setShowEducationModal] = useState(false);
  const handleShowEducationModal = () => {
    setShowEducationModal(true);
  };

  const [showExpertiseModal, setShowExpertiseModal] = useState(false);
  const handleShowExpertiseModal = () => {
    setShowExpertiseModal(true);
  };

  const handleCloseExpertiseModal = () => {
    setShowExpertiseModal(false);
  };

  const [showProjectModal, setShowProjectModal] = useState(false);
  const handleProjectModal = () => {
    setShowProjectModal(true);
  };
  const handleCloseProjectModal = () => {
    setShowProjectModal(false);
  };

  const handleCloseEducationModal = () => {
    setShowEducationModal(false);
  };

  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const handleShowSkillsModal = () => {
    setShowSkillsModal(true);
  };

  const handleCloseSkillsModal = () => {
    setShowSkillsModal(false);
  };

  const [showSocialMediaModal, setShowSocialMediaModal] = useState(false);
  const handleShowSocialMediaModal = () => {
    setShowSocialMediaModal(true);
  };

  const handleCloseSocialMediaModal = () => {
    setShowSocialMediaModal(false);
  };

  const handleDeveloperDetails = () => {
    setDeveloperDetails(true);
  };
  const handleClosDeveloperDetails = () => {
    setDeveloperDetails(false);
  };

  const approvedEdit = async () => {
    await dispatch(approvedEditAction(userId));
    dispatch(getDeveloperDetails(userId));
  };

  const rejectEdit = async () => {
    await dispatch(rejectEditAction(userId));
    dispatch(getDeveloperDetails(userId));
  };
  const overallRating = 7;
  const reactRating = 9;
  const vueRating = 7;
  const jsRating = 8;
  const nextRating = 5;
  const angularRating = 6;
  const nodeRating = 7;
  const commRating = 8;

  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

  const toggleFeedbackSection = () => {
    setIsFeedbackVisible(!isFeedbackVisible);
  };

  const introVideo = (
    <Tooltip>Introduction Video</Tooltip>
  )

  const seeReview = (
    <Tooltip>See Review</Tooltip>
  )

  const [showIntroVideo, setShowIntroVideo] = useState(false);
  const handleShowIntroVideo = () => {
    setShowIntroVideo(!showIntroVideo);
  }
  const handleCloseIntroVideo = () => {
    setShowIntroVideo(false);
  }
  const [showcertificateupload, setShowCertificateUpload] = useState(false);
  const handleShowCertificateUpload = () => {
    setShowCertificateUpload(!showcertificateupload);
  }
  const handleCloseCertificateUpload = () => {
    setShowCertificateUpload(false);
  }

  return (
    <>
      {/* {screenLoader ? (
        <ScreenLoader />
      ) : ( */}
        <>
          <section className="overview-cv card-box">
            {/* <button className="second-step" onClick={startAppTour}>Start Tour</button> */}
            {/* <span id="first-step"></span> */}
            <div
              className={
                selectedTemplate === "cv-template1"
                  ? "cv-template-section cv-template3"
                  : "cv-template-section cv-template3 d-none"
              }
            >
              {role == "admin" && data?.isEdit ? (
                <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
                  <RexettButton
                    type="submit"
                    text={t("Approve")}
                    className="main-btn px-4 font-14 fw-semibold"
                    variant="transparent"
                    onClick={approvedEdit}
                    disabled={smallLoader}
                    isLoading={smallLoader}
                  />
                  <RexettButton
                    type="submit"
                    text={t("Reject")}
                    className="red-btn px-4 font-14 fw-semibold"
                    variant="transparent"
                    onClick={rejectEdit}
                    disabled={smallLoader}
                    isLoading={smallLoader}
                  />
                </div>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="section-head mb-0 border-0">{t("overview")}</h2>
                {/* <button className="main-btn px-xxl-5 px-4" onClick={()=>downloadResume(data?.developer_detail?.resume)}>Download Resume</button> */}
              </div>
              <Row>
                <Col lg={6} className="px-0">
                  <div className="resume-basic-info text-center">
                    <div className="resume-imgbx mx-auto mb-4">
                      <img
                        src={
                          data?.profile_picture
                            ? data?.profile_picture
                            : resumeImg
                        }
                        className="resume-img"
                      />
                    </div>
                    <h3 className="resume-name">
                      {data?.name}
                      <OverlayTrigger placement="bottom" overlay={introVideo}>
                        <span onClick={handleShowIntroVideo} className="text-green ms-2 cursor-pointer">
                          <FaCirclePlay />
                        </span>
                      </OverlayTrigger>
                    </h3>
                    <p className="resume-designation">
                      {data?.developer_detail?.professional_title}
                    </p>

                    <div>
                      <OverlayTrigger placement="bottom" overlay={seeReview}>
                        <span className="status-upcoming rating-status cursor-pointer" onClick={toggleFeedbackSection}>
                          <FaStar /> 4 (2)
                        </span>
                      </OverlayTrigger>
                      {/* <Button variant="transparent" className="ms-2 link-btn shadow-none font-14 p-0">Read Reviews</Button> */}
                      {/* <Button variant="transparent" className="ms-2 link-btn shadow-none font-14 p-0">Add Review</Button> */}
                    </div>
                    {isFeedbackVisible && (
                      <div className="connect-social-media border-bottom-0 pb-0">
                        {/* <div className="write-review-wrapper mb-3">
                        <Form.Control as="textarea" rows={2} className="common-field font-14 bg-white resize-none" placeholder="Whats your overall impression of this candidate" />
                        <div className="d-flex justify-content-between align-items-center p-2">
                          <div>
                            <div class="rating-box">
                              <div class="rating-container">
                                <input type="radio" name="rating" value="5" id="star-5" /> <label for="star-5">&#9733;</label>

                                <input type="radio" name="rating" value="4" id="star-4" /> <label for="star-4">&#9733;</label>

                                <input type="radio" name="rating" value="3" id="star-3" /> <label for="star-3">&#9733;</label>

                                <input type="radio" name="rating" value="2" id="star-2" /> <label for="star-2">&#9733;</label>

                                <input type="radio" name="rating" value="1" id="star-1" /> <label for="star-1">&#9733;</label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex align-items-center gap-2">
                            <Button variant="transparent" className="link-text-btn border-0">Cancel</Button>
                            <Button variant="transparent" className="main-btn font-14">Submit</ Button>
                          </div>
                        </div>
                      </div> */}
                        <div className="feedback-section px-2">
                          <div className="d-flex align-items-start gap-2 text-start feedback-wrapper">
                            <img src={resumeImg} className="client-review-img" />
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <p className="font-14 fw-semibold mb-0">Michael Brown</p> <span className="font-14 text-dark">Today</span>
                              </div>
                              <div className="star-rating">
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span>
                                  <FaStar />
                                </span>
                              </div>
                              <p className="text-grey mt-1 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            </div>
                          </div>
                          <div className="d-flex align-items-start gap-2 text-start feedback-wrapper">
                            <img src={resumeImg} className="client-review-img" />
                            <div>
                              <div className="d-flex align-items-center gap-2">
                                <p className="font-14 fw-semibold mb-0">Michael Brown</p> <span className="font-14 text-dark">12-05-2024</span>
                              </div>
                              <div className="star-rating">
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span className="active">
                                  <FaStar />
                                </span>
                                <span>
                                  <FaStar />
                                </span>
                              </div>
                              <p className="text-grey mt-1 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            </div>
                          </div>
                        </div>
                      </div>)}
                    <div className="text-start mt-3 d-flex align-items-center gap-2 flex-wrap justify-content-center mb-3 personal-info-wrapper">
                      <div>
                        <p className="mb-0 font-14">
                          <span><FaEnvelope /></span> robertjohnson@gmail.com</p>
                      </div>
                      <div>
                        <p className="mb-0 font-14">
                          <span><MdLocalPhone /></span> +91 123456789</p>
                      </div>
                      <div>
                        <p className="mb-0 font-14">
                          <span><MdWork /></span> 5 years</p>
                      </div>
                      <div>
                        <p className="mb-0 font-14">
                          <span><MdLocationOn /></span>India</p>
                      </div>
                      <div>
                        <p className="mb-0 font-14">
                          <span><MdWork /></span> Remote</p>
                      </div>
                      <div>
                        <p className="mb-0 font-14">
                          <span><GoClockFill /></span> GMT(+5:30) Kolkata</p>
                      </div>
                    </div>
                    {data?.developer_detail ? (
                      <div className="px-3 d-flex justify-content-center align-items-center gap-2">
                        <ul className="social-media">
                          <li>
                            {data?.developer_detail?.github_url ? (
                              <Link
                                className="social-media-link"
                                to={data?.developer_detail?.github_url}
                              >
                                <FaGithub />
                              </Link>
                            ) : (
                              ""
                            )}
                          </li>
                          <li>
                            {data?.developer_detail?.linkedin_url ? (
                              <Link
                                className="social-media-link"
                                to={data?.developer_detail?.linkedin_url}
                              >
                                <FaLinkedin />
                              </Link>
                            ) : (
                              ""
                            )}
                          </li>
                        </ul>
                        {/* {role !== "client" && (
                          <div
                            className="add_more_section"
                            onClick={handleShowSocialMediaModal}
                          >
                            <MdEditNote size={25} />
                          </div>
                        )} */}
                      </div>
                    ) : (
                      ""
                    )}
                    {role !== "client" && (
                      <div
                        className="add_more_section_detail"
                        id="edit_1"
                        onClick={handleDeveloperDetails}
                      >
                        <MdEditNote size={25} />
                      </div>
                    )}
                  </div>
                  {/* <div className="connect-social-media px-3">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume text-center mb-0">
                        Introduction Video
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section"
                          id="edit_2"
                          onClick={handleShowSkillsModal}
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    <video className="w-100" controls>
                      <source src={introVideo} />
                    </video>
                  </div> */}
                  <div className="connect-social-media px-3">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume mb-0">
                        {t("expertise")}
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section_education pointer"
                          id="edit_3"
                          onClick={handleShowExpertiseModal}
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    <div className="">
                      {data?.expertises ? (
                        <>
                          {data?.expertises?.map(
                            (
                              { experience, skill, skill_icon, is_edited },
                              index
                            ) => {
                              return (
                                <React.Fragment key={index}>
                                  <div
                                    className={`exp-wrapper expertise-card ${is_edited && "resume-edit"
                                      } `}
                                  >
                                    <img src={skill_icon?.icon_url} />
                                    <p className="expertise-skill">{skill}</p>
                                    <p className="expertise-exp">
                                      {experience ? experience : "1 year"}
                                    </p>
                                  </div>
                                </React.Fragment>
                              );
                            }
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="connect-social-media px-3">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume text-center mb-0">
                        {t("skills")}
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section"
                          id="edit_2"
                          onClick={handleShowSkillsModal}
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    <ul className={`skills-pill text-center }`}>
                      {data?.other_skills?.map((item, index) => {
                        return (
                          <>
                            <li
                              key={index}
                              className={`${item?.is_edited && "resume-edit"}`}
                            >
                              <span>{item?.skill}</span>{" "}
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="connect-social-media px-3">
                    <div>
                      <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-3">
                        <h3 className="subheading-resume mb-0">
                          {t("projects")}
                        </h3>
                        {role !== "client" && (
                          <div
                            className="add_more_section_education pointer"
                            onClick={handleProjectModal}
                            id="edit_4"
                          >
                            <MdEditNote size={25} />
                          </div>
                        )}
                      </div>
                      {/* </div> */}
                      <div>
                        {data?.developer_projects ? (
                          <>
                            {data?.developer_projects?.map(
                              (
                                {
                                  project_title,
                                  project_link,
                                  project_start_date,
                                  role_in_project,
                                  project_end_date,
                                  tech_stacks_used,
                                  is_edited,
                                },
                                index
                              ) => {
                                return (
                                  <React.Fragment key={index}>
                                    <div
                                      className={`project-wrapper  ${is_edited && "resume-edit"
                                        }`}
                                    >
                                      {/* <div className="exp-wrapper expertise-card"> */}
                                      {/* <p className="exp-year">{} - {} | {}</p> */}
                                      {/* <img src={skill_icon?.icon_url} /> */}
                                      <div
                                        className={`flex justify-content-between align-items-start mb-1`}
                                      >
                                        <div>
                                          <p className="project-title mb-0">
                                            {project_title}
                                          </p>
                                          <p className="project-role p-0 bg-transparent mb-0 d-block mb-2">
                                            {role_in_project}
                                          </p>
                                          <p className="project-role mb-1">
                                            Healthcare
                                          </p>
                                        </div>
                                        <div className="project-date-wrapper status-finished">
                                          <div className="d-flex align-items-center gap-2">
                                            <p className="project-date mb-0">{`${project_start_date?.slice(
                                              0,
                                              10
                                            )}`}</p>{" "}
                                            -
                                            <p className="project-date mb-0">{`${project_end_date?.slice(
                                              0,
                                              10
                                            )}`}</p>
                                          </div>
                                        </div>
                                      </div>
                                      <label className="font-14 mb-1">
                                        Tech Skill Used
                                      </label>
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                          <ul className="skills-pill text-start">
                                            {splitSkills(tech_stacks_used)?.map(
                                              (item, index) => {
                                                return (
                                                  <>
                                                    <li key={index}>
                                                      <span>{item}</span>
                                                    </li>
                                                  </>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                        <div>
                                          <a
                                            href={project_link}
                                            className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                                          >
                                            Show Project <FiExternalLink />
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </React.Fragment>
                                );
                              }
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* {data?.developer_detail ? (
                    <div className="connect-social-media px-3">
                      <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume text-center mb-0">
                          {t("connectWithMe")}
                        </h3>
                        {role !== "client" && (
                          <div
                            className="add_more_section"
                            onClick={handleShowSocialMediaModal}
                          >
                            <MdEditNote size={25} />
                          </div>
                        )}
                      </div>

                      <ul className="social-media">
                        <li>
                          {data?.developer_detail?.github_url ? (
                            <Link
                              className="social-media-link"
                              to={data?.developer_detail?.github_url}
                            >
                              <FaGithub />
                            </Link>
                          ) : (
                            ""
                          )}
                        </li>
                        <li>
                          {data?.developer_detail?.linkedin_url ? (
                            <Link
                              className="social-media-link"
                              to={data?.developer_detail?.linkedin_url}
                            >
                              <FaLinkedin />
                            </Link>
                          ) : (
                            ""
                          )}
                        </li>
                      </ul>
                    </div>
                  ) : (
                    ""
                  )} */}
                </Col>
                <Col lg={6} className="px-0 h-100">
                  <div className="about-info px-4">
                    <div className="">
                      <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume mb-0">
                          {t("aboutMe")}
                        </h3>
                        {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                        {role !== "client" && (
                          <div
                            className="add_more_section"
                            onClick={handleShowModal}
                            id="edit_5"
                          >
                            <MdEditNote size={25} />
                          </div>
                        )}
                      </div>
                      {data?.developer_detail?.bio?.length > 300 ? (
                        <p
                          className={`resume-text ${data?.developer_detail?.is_edited
                            ? "resume-edit"
                            : ""
                            }  `}
                        >
                          {readmore &&
                            developerDetails?.developer_detail?.bio?.length >
                            300 ? (
                            <>
                              {data?.developer_detail?.bio.slice(0, 300)}
                              {/* <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span> */}
                            </>
                          ) : (
                            <>
                              {data?.developer_detail?.bio}
                              {/* <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span> */}
                            </>
                          )}
                        </p>
                      ) : (
                        <p
                          className={`resume-text ${data?.developer_detail?.is_edited
                            ? "resume-edit"
                            : ""
                            }  `}
                        >
                          {" "}
                          {data?.developer_detail?.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="about-info px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume mb-0">
                        {t("experience")}
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section"
                          onClick={handleShowExperienceModal}
                          id="edit_6"
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    {data?.user_experience &&
                      Object.keys(data?.user_experience).length > 0 &&
                      Object.keys(data?.user_experience).map((key) => (
                        <div className={`exp-timeline`}>
                          <SingleExperienceCard
                            companyName={key}
                            totalExperience={
                              data?.user_experience[key]["total_experience"]
                            }
                            experienceData={
                              data?.user_experience[key]["experiences"]
                            }
                          />
                        </div>
                      ))}
                  </div>
                  <div className="about-info px-4 pt-4">

                    {data?.developer_educations ? (
                      <>
                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                          <h3 className="subheading-resume mb-0">
                            {t("education")}
                          </h3>
                          {role !== "client" && (
                            <div
                              className="add_more_section_education pointer"
                              onClick={handleShowEducationModal}
                              id="edit_7"
                            >
                              <MdEditNote size={25} />
                            </div>
                          )}
                        </div>
                        {data?.developer_educations?.map((item) => {
                          return (
                            <React.Fragment key={item.id}>
                              <div
                                className={`exp-wrapper ${item?.is_edited && "resume-edit"
                                  }`}
                              >
                                <p>
                                  {item?.start_year} -{" "}
                                  {item?.end_year ? item?.end_year : "Present"}{" "}
                                  | {item?.Degree?.title}
                                </p>
                                <ul className="exp-role">
                                  <li>{item?.university_name}</li>
                                  <li>{item?.Degree?.title}</li>
                                </ul>
                              </div>
                            </React.Fragment>
                          );
                        })}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="about-info px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume text-center mb-0">
                        Certifications
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section"
                          id="edit_2"
                          onClick={handleShowCertificateUpload}
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    <div className="mb-2">
                      <div className="project-wrapper">
                        <div className="d-flex align-items-center justify-content-between">
                          <div>
                            <p className="project-title mb-0">
                              Network association
                            </p>
                            <p className="project-role mb-1">
                              Microsoft
                            </p>
                          </div>
                          <div className="project-date-wrapper status-finished">
                            <div className="d-flex align-items-center gap-2 ">
                              <p className="project-date mb-0">12-05-2023</p>{" "}
                              -
                              <p className="project-date mb-0">16-10-2023</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <a
                            href={'#'}
                            className="project-link main-btn px-2 py-1 font-14 outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                          >
                            Show Certificate <FiExternalLink />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="about-info px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                      <h3 className="subheading-resume text-center mb-0">
                        Screening Round
                      </h3>
                      {role !== "client" && (
                        <div
                          className="add_more_section"
                          id="edit_2"
                          onClick={handleShowSkillsModal}
                        >
                          <MdEditNote size={25} />
                        </div>
                      )}
                    </div>
                    <div className="rating-container">
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={overallRating} text={`${overallRating}`} styles={buildStyles({ pathColor: '#00af6c', textColor: '#121212', textSize: '25px', trailColor: '#c6fff6' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">Overall</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={reactRating} text={`${reactRating}`} styles={buildStyles({ pathColor: '#00af6c', textColor: '#121212', textSize: '25px', trailColor: '#c6fff6' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">React JS</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={vueRating} text={`${vueRating}`} styles={buildStyles({ pathColor: '#ffcb1a', textColor: '#121212', textSize: '25px', trailColor: '#ffe5c0' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">Vue JS</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={jsRating} text={`${jsRating}`} styles={buildStyles({ pathColor: '#05db8a', textColor: '#121212', textSize: '25px', trailColor: '#c6fff6' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">JavaScript</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={angularRating} text={`${angularRating}`} styles={buildStyles({ pathColor: '#eaeb08', textColor: '#121212', textSize: '25px', trailColor: '#fffdc3' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">Angular JS</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={nextRating} text={`${nextRating}`} styles={buildStyles({ pathColor: '#eaeb08', textColor: '#121212', textSize: '25px', trailColor: '#fffdc3' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">MongoDB</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={nodeRating} text={`${nodeRating}`} styles={buildStyles({ pathColor: '#ffcb1a', textColor: '#121212', textSize: '25px', trailColor: '#ffe5c0' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">Node JS</p>
                      </div>
                      <div className="ratinng-wrapper d-block text-center">
                        <div className="rating-progress mb-2">
                          <CircularProgressbar value={commRating} text={`${commRating}`} styles={buildStyles({ pathColor: '#05db8a', textColor: '#121212', textSize: '25px', trailColor: '#c6fff6' })} strokeWidth={12} maxValue={10} />
                        </div>
                        <p className="font-14">Communication</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <Button className="main-btn font-14 me-2 py-2"><span className="font-18 me-1"><MdOutlineOndemandVideo /></span> Playback</Button>
                      <Button className="main-btn font-14 py-2"><span className="font-18 me-1"><TbFileDownload /></span>Transcript</Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </section>

          <ModalWrapper show={showModal} handleClose={handleCloseModal}>
            <AboutCV
              handleClose={handleCloseModal}
              data={data?.developer_detail?.bio}
              id={data?.id}
              role={role}
              isEdited={data?.developer_detail?.is_edited}
            />
          </ModalWrapper>

          {showExperienceModal ? (
            <ModalWrapper show={showExperienceModal} handleClose={handleCloseExperienceModal}>
              <ExperienceCV
                handleClose={handleCloseExperienceModal}
                data={data?.developer_experiences}
                smallLoader={smallLoader}
                id={data?.id}
                role={role}
              />
            </ModalWrapper>
          ) : (
            ""
          )}
          {showEducationModal ? (
            <ModalWrapper show={showEducationModal} handleClose={handleCloseEducationModal}>
              <EducationCV
                show={showEducationModal}
                handleClose={handleCloseEducationModal}
                data={data?.developer_educations}
                smallLoader={smallLoader}
                id={data?.id}
                role={role}
              />
            </ModalWrapper>
          ) : (
            ""
          )}
          {showSkillsModal ? (
            <ModalWrapper show={showSkillsModal} handleClose={handleCloseSkillsModal}>
              <SkillsModal
                show={showSkillsModal}
                handleClose={handleCloseSkillsModal}
                data={data?.other_skills}
                id={data?.id}
                role={role}
              />
            </ModalWrapper>
          ) : (
            ""
          )}
          {showSocialMediaModal ? (
            <ModalWrapper show={showSocialMediaModal} handleClose={handleCloseSocialMediaModal}>
              <SocialMediaModal
                show={showSocialMediaModal}
                handleClose={handleCloseSocialMediaModal}
                data={data?.social_links}
                id={data?.id}
                role={role}
              />
            </ModalWrapper>

          ) : (
            ""
          )}
          {showExpertiseModal ? (
            <ModalWrapper show={showExpertiseModal} handleClose={handleCloseExpertiseModal}>
              <ExpertiseModal
                data={data?.expertises}
                handleClose={handleCloseExpertiseModal}
                id={data?.id}
                role={role}
              />
            </ModalWrapper>

          ) : (
            ""
          )}
          <DeveloperDetails
            show={developerDetails}
            handleClose={handleClosDeveloperDetails}
            position={data?.developer_detail?.professional_title}
            name={data?.name}
            profile={data?.profile_picture}
            experience={data?.developer_detail?.total_experience}
            smallLoader={smallLoader}
            id={data?.id}
            role={role}
            isEdited={data?.developer_detail?.is_edited}
          />
        </>
      {/* )} */}
      {showProjectModal && (
        <ModalWrapper show={showProjectModal} handleClose={handleCloseProjectModal}>
          <ProjectsModal
            data={data.developer_projects}
            show={showSkillsModal}
            handleClose={handleCloseProjectModal}
            id={data?.id}
            role={role}
          />
        </ModalWrapper>
      )}
      <IntroVideo show={showIntroVideo} handleClose={handleCloseIntroVideo} />
      <CertificateUpload show={showcertificateupload} handleClose={handleCloseCertificateUpload} />
    </>
  );
};
export default SingleDeveloper;
