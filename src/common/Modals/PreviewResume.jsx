import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { FaCirclePlay, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiExternalLink } from "react-icons/fi";
import { GoClockFill } from "react-icons/go";
import { MdLocalPhone, MdLocationPin, MdWork } from "react-icons/md";
import resumeImg from "../../assets/images/user-img.jpg";
const PreviewModal = ({ show, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose} centered size="lg" className="custom-modal modal-90w">
                <Modal.Header closeButton className="border-0 pb-3">
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <section className="overview-cv">
                            <div className="cv-template-section">
                                <div className="">
                                    <h2 className="section-head mb-0 border-0">Overview</h2>
                                    <Row>
                                        <Col md={6} className="px-0 h-100">
                                            <div className="resume-basic-info text-center">
                                                <div className="resume-imgbx mx-auto mb-2">
                                                    <img src={resumeImg} className="resume-img"
                                                    />
                                                </div>
                                                <h3 className="resume-name">
                                                    John Doe
                                                    <span className="text-green ms-2 cursor-pointer">
                                                        <FaCirclePlay />
                                                    </span>
                                                </h3>
                                                <p className="resume-designation">John doe</p>
                                                <div className="text-start mt-1 d-flex align-items-center flex-wrap justify-content-center mb-1 personal-info-wrapper">
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
                                                            <span><MdLocationPin /></span>India</p>
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

                                                    <div className="exp-wrapper expertise-card"
                                                    >
                                                        {/* <img src={skill_icon?.icon_url} /> */}
                                                        <p className="expertise-skill">Laravel</p>
                                                        <p className="expertise-exp">1 year
                                                        </p>
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
                                                    <div>
                                                        <div
                                                            className="project-wrapper"
                                                        >
                                                            <div>
                                                                <p className="project-title mb-0">
                                                                    AI bot project
                                                                </p>
                                                                <p className="project-role p-0 bg-transparent mb-0 d-block mb-2">
                                                                    Web developer
                                                                </p>
                                                                <p className="project-role mb-1">
                                                                    Healthcare
                                                                </p>
                                                            </div>
                                                            <div className="d-flex align-items-center gap-2 project-date-wrapper status-finished">
                                                                <p className="project-date mb-0 ">10-05-2024</p>
                                                                -
                                                                <p className="project-date mb-0 ">12-05-2024</p>
                                                            </div>
                                                        </div>
                                                        <label className="font-14 mb-1">
                                                            Tech Skill Used
                                                        </label>
                                                        <div className="d-flex justify-content-between align-items-start">
                                                            <div>
                                                                <ul className="skills-pill text-start">
                                                                    <li>
                                                                        <span>HTML</span>
                                                                        <span>CSS</span>
                                                                        <span>Javascript</span>
                                                                        <span>Bootstrap</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div>
                                                                <a
                                                                    href={'/'}
                                                                    className="project-link main-btn px-1 py-1  outline-main-btn text-decoration-none mb-1 d-inline-flex align-items-center gap-2"
                                                                >
                                                                    Show Project <FiExternalLink />
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                    <p className="resume-text">
                                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
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
                                                    <div>
                                                        <h5>XYZ Company Pvt Ltd</h5>
                                                        <p>3 years</p>
                                                        <div>
                                                            <div className="sub-exp">
                                                                <h4 className="role-text">Web Developer </h4>
                                                                <p className="exp-date">
                                                                    Present - 2023
                                                                </p>
                                                                <p className="exp-desc">
                                                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="about-info px-2 pt-2">
                                                <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-2">
                                                    <h3 className="subheading-resume mb-0">
                                                        Education
                                                    </h3>
                                                </div>
                                                <div className="exp-wrapper">
                                                    <p>
                                                        20-06-2016 - 10-06-2020 | B.Tech Computer Science
                                                    </p>
                                                    <ul className="exp-role">
                                                        <li>Panjab University</li>
                                                        <li>Bachelor of Science</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </section>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default PreviewModal;