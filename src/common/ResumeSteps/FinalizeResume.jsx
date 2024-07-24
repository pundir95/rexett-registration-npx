import React, { useEffect, useState } from "react";
import rexettLogo from "../../assets/images/rexett-logo-white.png";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaCirclePlay,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa6";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import profileImg from "../../assets/images/demo-img.jpg";
import { IoCameraOutline } from "react-icons/io5";
import { MdLocalPhone, MdLocationOn, MdWork } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { FiExternalLink } from "react-icons/fi";
import ReactQuill from "react-quill";
import resumeImg from "../../assets/images/user-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import ThankRegister from "../Modals/ThankRegister";
import { getDeveloperProfileDetails } from "../../Redux/Slices/DeveloperDataSlice";
const FinalizeResume = () => {
  const dispatch = useDispatch()
  const { smallLoader, developerRegistrationData } = useSelector(
    (state) => state?.developerData
  );
  let developerId=localStorage.getItem("developerId")

  useEffect(()=>{
      if(developerId){
          dispatch(getDeveloperProfileDetails(developerId));
      }
    
  },[developerId])

  console.log(developerRegistrationData,"developerDetails")


  return (
    <>
      <Row>
        <Col md={12}>
          <div>
            <div>
              <section className="overview-cv">
                <div className="cv-template-section">
                  <div className="">
                    <h2 className="section-head mb-0 border-0">Overview</h2>
                    <Row>
                      <Col md={6} className="px-0 h-100">
                        <div className="resume-basic-info text-center">
                          <div className="resume-imgbx mx-auto mb-2">
                            <img src={resumeImg} className="resume-img" />
                          </div>
                          <h3 className="resume-name">
                            {developerRegistrationData?.step1?.name}
                            <span className="text-green ms-2 cursor-pointer">
                              <FaCirclePlay />
                            </span>
                          </h3>
                          <p className="resume-designation">John doe</p>
                          <div className="text-start mt-1 d-flex align-items-center flex-wrap justify-content-center mb-1 personal-info-wrapper">
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <FaEnvelope />
                                </span>{" "}
                                {developerRegistrationData?.step1?.email}
                              </p>
                            </div>
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <MdLocalPhone />
                                </span>{" "}
                                {developerRegistrationData?.step1?.phone_number}
                              </p>
                            </div>
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <MdWork />
                                </span>{" "}
                                5 years
                              </p>
                            </div>
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <MdLocationOn />
                                </span>
                                {developerRegistrationData?.step1?.country}
                              </p>
                            </div>
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <MdWork />
                                </span>{" "}
                                Remote
                              </p>
                            </div>
                            <div>
                              <p className="mb-0 font-14">
                                <span>
                                  <GoClockFill />
                                </span>{" "}
                               {developerRegistrationData?.step1?.time_zone}
                              </p>
                            </div>
                          </div>
                          <div className="px-3 d-flex justify-content-center align-items-center gap-2">
                            <ul className="social-media">
                              <li>
                                <FaGithub />
                              </li>
                              <li>
                                <FaLinkedin />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="connect-social-media px-2">
                          <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                            <h3 className="subheading-resume mb-0">
                              Expertise
                            </h3>
                          </div>
                          <div className="">
                            <div className="exp-wrapper expertise-card">
                              {/* <img src={skill_icon?.icon_url} /> */}
                              <p className="expertise-skill">Laravel</p>
                              <p className="expertise-exp">1 year</p>
                            </div>
                          </div>
                        </div>
                        <div className="connect-social-media px-2">
                          <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                            <h3 className="subheading-resume text-center mb-0">
                              Skills
                            </h3>
                          </div>
                          <ul className="skills-pill text-center">
                            <li>
                              <span>Drupal</span>
                            </li>
                          </ul>
                        </div>
                        <div className="connect-social-media px-2">
                          <div>
                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                              <h3 className="subheading-resume mb-0">
                                Projects
                              </h3>
                            </div>
                            {developerRegistrationData?.step6?.map((ele)=>(
                            <div>
                              <div className="project-wrapper">
                                <div>
                                  <p className="project-title mb-0">
                                   {ele?.project_title}
                                  </p>
                                  <p className="project-role p-0 bg-transparent mb-0 d-block mb-2">
                                    {ele?.role_in_project}
                                  </p>
                                  <p className="project-role mb-1">
                                    {ele?.project_type}
                                  </p>
                                </div>
                                <div className="d-flex align-items-center gap-2 project-date-wrapper status-finished">
                                  <p className="project-date mb-0">
                                    {ele?.project_start_date.slice(0,10)}
                                  </p>
                                  -
                                  <p className="project-date mb-0">
                                  {ele?.project_end_date.slice(0,10)}
                                  </p>
                                </div>
                              </div>
                              <label className="font-14 mb-1">
                                Tech Skill Used
                              </label>
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <ul className="skills-pill text-start" >
                                    <li>
                                      {ele?.tech_stacks_used?.split(',')?.map((val)=>(
                                      <span>{val}</span>
                                      ))}
                                    </li>
                                  </ul>
                                </div>
                                <div>
                                  <a
                                    href={`/${ele?.project_link}`}
                                    className="project-link main-btn px-1 py-1  outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                                  >
                                    Show Project <FiExternalLink />
                                  </a>
                                </div>
                              </div>
                            </div>
                            ))}
                          </div>
                        </div>
                      </Col>
                      <Col md={6} className="px-0 h-100">
                        <div className="about-info px-2">
                          <div className="">
                            <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                              <h3 className="subheading-resume mb-0">
                                About Me
                              </h3>
                            </div>
                            <p className="resume-text" dangerouslySetInnerHTML={{
                        __html:developerRegistrationData?.step5?.bio
                      }}>
                            </p>
                          </div>
                        </div>
                        <div className="about-info px-2 pt-2">
                          <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                            <h3 className="subheading-resume mb-0">
                              Experience
                            </h3>
                          </div>
                          <div className="exp-timeline">
                            { developerRegistrationData?.step2?.map((ele)=>(
                            <div>
                              <h5>{ele?.company_name}</h5>
                              <p>3 years</p>
                              <div>
                                <div className="sub-exp">
                                  <h4 className="role-text">{ele?.job_title} </h4>
                                  <p className="exp-date">{`${ele?.start_date.slice(0,4)}-${ele?.is_still_working ? 'Present' : ele?.end_date.slice(0,4)}`}</p>
                                  <p className="exp-desc" dangerouslySetInnerHTML={{
                        __html:ele?.description
                      }}>
                                  </p>
                                </div>
                              </div>
                            </div>
                            ))}
                          </div>
                        </div>
                        <div className="about-info px-2 pt-2">
                          <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                            <h3 className="subheading-resume mb-0">
                              Education
                            </h3>
                          </div>
                          {developerRegistrationData?.step3?.map((ele)=>(
                          <div className="exp-wrapper">
                            <p>
                              {`20-06-2016 - 10-06-2020 | ${ele?.field_of_study}`}
                            </p>
                            <ul className="exp-role">
                              <li>{ele?.university_name}</li>
                              <li dangerouslySetInnerHTML={{
                        __html:ele?.description
                      }}></li>
                            </ul>
                          </div>
))}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </Col>
      </Row>

      <ThankRegister show={false} />
    </>
  );
};
export default FinalizeResume;
