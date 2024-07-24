import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import resumeImg from '../../../assets/img/user-img.jpg'
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaGitlab } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";
import { MdEditNote, MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaLinkedin } from "react-icons/fa";
import ScreenLoader from "../../atomic/ScreenLoader";
import { useTranslation } from "react-i18next";
import AboutCV from "../Modals/AboutCVModal";
import ExperienceCV from "../Modals/ExperienceCVModal";
import EducationCV from "../Modals/EducationModal";
import SkillsModal from "../Modals/SkillsCVModal";
import SocialMediaModal from "../Modals/SocialMediaModal";
import DeveloperDetails from "../Modals/DeveloperDetails";
import ExpertiseModal from "../Modals/ExpertiseModal";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';



const SingleDeveloperUpdated = ({ data, role }) => {
    const dispatch = useDispatch()
    const { screenLoader, smallLoader } = useSelector(state => state.clientData)
    const [selectedTemplate, setSelectedTemplate] = useState('cv-template1')
    const [developerDetails, setDeveloperDetails] = useState(false);
    const [readmore, setReadMore] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const { t } = useTranslation()



    const splitSkills = (data) => {
        let skills = data?.skills?.split(",")
        return skills

    }
    const handleShowModal = () => {
        setShowModal(true);
    };

    const readMoreLess = () => {
        setReadMore(!readmore)
    }

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

    const [showExpertiseModal, setShowExpertiseModal] = useState(false)
    const handleShowExpertiseModal = () => {
        setShowExpertiseModal(true)
    }

    const handleCloseExpertiseModal = () => {
        setShowExpertiseModal(false)
    }

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
        setDeveloperDetails(true)
    }
    const handleClosDeveloperDetails = () => {
        setDeveloperDetails(false)
    }
    const generateSocailLinks = (link) => {
        switch (link) {
            // case "Facebook":
            //     return <FaFacebookF />
            case "LinkedIn":
                return <FaLinkedinIn />
            // case "Twitter":
            //     return <FaTwitter />
            case "GitHub":
                return <FaGithub />
            // case "Instagram":
            //     return <FaInstagram />
            default:
        }
    }
    return (
        <>
            {screenLoader ? <ScreenLoader /> : <>
                <section className="overview-cv card-box updated-cv">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="old-cv">

                        <div className="d-flex mb-3">
                            <Nav variant="pills" className="weekly-tabs mb-0">
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="old-cv">Old Profile</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='weekly-tab-item'>
                                    <Nav.Link className='weekly-tab-link' eventKey="new-cv">New Profile</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey="old-cv">
                                <div>
                                    <div>
                                        <div className={selectedTemplate === 'cv-template1' ? 'cv-template-section cv-template3' : 'cv-template-section cv-template3 d-none'}>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                {/* <button className="main-btn px-xxl-5 px-4" onClick={()=>downloadResume(data?.developer_detail?.resume)}>Download Resume</button> */}
                                            </div>
                                            <Row>
                                                <Col lg={6} className="px-0">
                                                    <div className="resume-basic-info text-center">
                                                        <div className="resume-imgbx mx-auto mb-4">
                                                            <img src={data?.profile_picture ? data?.profile_picture : resumeImg} className="resume-img" />
                                                        </div>
                                                        <h3 className="resume-name">{data?.name}</h3>
                                                        <p className="resume-designation">{data?.developer_detail?.professional_title}</p>
                                                    </div>
                                                    <div className="connect-social-media">
                                                        <h3 className="subheading-resume text-center mb-3">{t("skills")}</h3>
                                                        <ul className="skills-pill text-center">
                                                            {
                                                                splitSkills(data?.developer_skills)?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <li key={index}><span>{item}</span> </li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                    <div className="connect-social-media">
                                                        <h3 className="subheading-resume text-center mb-3">{t("connectWithMe")}</h3>
                                                        
                                                        <ul className="social-media">
                                                            <li>
                                                                {data?.developer_detail?.github_url ? <Link to={data?.developer_detail?.github_url} ><FaGithub /></Link> : ""}
                                                            </li>
                                                            <li>
                                                                {data?.developer_detail?.linkedin_url ? <Link to={data?.developer_detail?.linkedin_url}><FaLinkedin /></Link> : ""}
                                                            </li>
                                                            
                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col lg={6} className="px-0 h-100">
                                                    <div className="about-info px-4">
                                                        <div className="">
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("aboutMe")}</h3>
                                                            {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                                                            {data?.developer_detail?.bio?.length > 300 ? <p className="resume-text">{readmore && developerDetails?.developer_detail?.bio?.length > 300 ? <>
                                                                {data?.developer_detail?.bio.slice(0, 300)}
                                                                <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span>
                                                            </> :
                                                                <>
                                                                    {data?.developer_detail?.bio}
                                                                    <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span>
                                                                </>
                                                            }
                                                            </p> : <> {data?.developer_detail?.bio}</>}
                                                        </div>
                                                    </div>

                                                    <div className="about-info px-4 pt-4">
                                                        <h3 className="subheading-resume mb-xxl-4 mb-3">{t("experience")}</h3>
                                                        {data?.developer_experiences?.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className="exp-wrapper">
                                                                        <p className="exp-year">{`${item?.start_date?.slice(0, 4)}-${item?.is_still_working ? "Present" : item?.end_date?.slice(0, 4)}`} | {item?.job_title} </p>
                                                                        <ul className="exp-role">
                                                                            <li className="resume-text">{item?.company_name} | <span>{item?.description}</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                        {data?.developer_educations ? <>
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("education")}</h3>
                                                            {data?.developer_educations?.map((item) => {
                                                                return (
                                                                    <React.Fragment key={item.id}>
                                                                        <div className="exp-wrapper">
                                                                            <p className="exp-year">{item?.start_year} - {item?.end_year ? item?.end_year : "Present"} | {item?.Degree?.title}</p>
                                                                            <ul className="exp-role">
                                                                                <li className="resume-text">{item?.university_name}</li>
                                                                                <li className="resume-text">{item?.Degree?.description}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </> : ""}
                                                        {data?.developer_educations ? <>
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("expertise")}</h3>
                                                            {data?.developer_educations?.map((item) => {
                                                                return (
                                                                    <React.Fragment key={item.id}>
                                                                        <div className="exp-wrapper">
                                                                            <p className="exp-year">{ } - { } | { }</p>
                                                                            <ul className="exp-role">
                                                                                <li className="resume-text">{ }</li>
                                                                                <li className="resume-text">{ }</li>
                                                                            </ul>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </> : ""}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="new-cv">
                                <div>
                                    <div>
                                        <div className={selectedTemplate === 'cv-template1' ? 'cv-template-section cv-template3' : 'cv-template-section cv-template3 d-none'}>

                                            <div className="d-flex justify-content-between align-items-center mb-4">
                                                {/* <button className="main-btn px-xxl-5 px-4" onClick={()=>downloadResume(data?.developer_detail?.resume)}>Download Resume</button> */}
                                            </div>
                                            <Row>
                                                <Col lg={6} className="px-0">
                                                    <div className="resume-basic-info text-center">
                                                        <div className="resume-imgbx mx-auto mb-4">
                                                            <img src={data?.profile_picture ? data?.profile_picture : resumeImg} className="resume-img" />
                                                        </div>
                                                        <h3 className="resume-name">{data?.name} <span className="edited-pill text-capitalize">Edited</span></h3>
                                                        <p className="resume-designation">{data?.developer_detail?.professional_title}</p>
                                                    </div>
                                                    <div className="connect-social-media">
                                                        <h3 className="subheading-resume text-center mb-3">{t("skills")} <span className="edited-pill">Edited</span></h3>
                                                        <ul className="skills-pill text-center">
                                                            {
                                                                splitSkills(data?.developer_skills)?.map((item, index) => {
                                                                    return (
                                                                        <>
                                                                            <li key={index}><span>{item}</span> </li>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                            <li><span>HTML (new added)</span> </li>
                                                        </ul>
                                                    </div>
                                                    <div className="connect-social-media">
                                                        <h3 className="subheading-resume text-center mb-3">{t("connectWithMe")}</h3>
                                                        {/* <ul className="social-media">
                                            {developerDetails?.social_links?.map((item)=>{
                                                return(
                                                    <>
                                                    <li>
                                                <Link to={item.url} className="social-media-link">
                                                    {generateSocailLinks(item.slug)}
                                                </Link>
                                            </li>
                                                    </>
                                                )
                                            })
                                            }

                                        </ul> */}

                                                        <ul className="social-media">
                                                            <li>
                                                                {data?.developer_detail?.github_url ? <Link to={data?.developer_detail?.github_url} ><FaGithub /></Link> : ""}
                                                            </li>
                                                            <li>
                                                                {data?.developer_detail?.linkedin_url ? <Link to={data?.developer_detail?.linkedin_url}><FaLinkedin /></Link> : ""}
                                                            </li>
                                                            {/* <li>
                                                    <Link to={developerDetails?.developer_detail?.email}><MdEmail /></Link>
                                                </li> */}
                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col lg={6} className="px-0 h-100">
                                                    <div className="about-info px-4">
                                                        <div className="">
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("aboutMe")} <span className="edited-pill">Edited</span></h3>
                                                            {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                                                            {data?.developer_detail?.bio?.length > 300 ? <p className="resume-text">{readmore && developerDetails?.developer_detail?.bio?.length > 300 ? <>
                                                                {data?.developer_detail?.bio.slice(0, 300)}
                                                                <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span>
                                                            </> :
                                                                <>
                                                                    {data?.developer_detail?.bio}
                                                                    <span className="readLess" onClick={readMoreLess}> {readmore ? '[Read more...]' : '[Read Less]'} </span>
                                                                </>
                                                            }
                                                            </p> : <> {data?.developer_detail?.bio}</>}
                                                        </div>
                                                    </div>

                                                    <div className="about-info px-4 pt-4">
                                                        <h3 className="subheading-resume mb-xxl-4 mb-3">{t("experience")} <span className="edited-pill">Edited</span></h3>
                                                        <div className="exp-wrapper edited-section">
                                                            <p className="exp-year">2022-Present | Frontend Developer  <span className="added-pill">Added</span></p>
                                                            <ul className="exp-role">
                                                                <li className="resume-text">New Developer | <span>Building Website</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        {data?.developer_experiences?.map((item) => {
                                                            return (
                                                                <>
                                                                    <div className="exp-wrapper">
                                                                        <p className="exp-year">{`${item?.start_date?.slice(0, 4)}-${item?.is_still_working ? "Present" : item?.end_date?.slice(0, 4)}`} | {item?.job_title} </p>
                                                                        <ul className="exp-role">
                                                                            <li className="resume-text">{item?.company_name} | <span>{item?.description}</span></li>
                                                                        </ul>
                                                                    </div>
                                                                </>
                                                            )
                                                        })}
                                                        {data?.developer_educations ? <>
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("education")}</h3>
                                                            {data?.developer_educations?.map((item) => {
                                                                return (
                                                                    <React.Fragment key={item.id}>
                                                                        <div className="exp-wrapper">
                                                                            <p className="exp-year">{item?.start_year} - {item?.end_year ? item?.end_year : "Present"} | {item?.Degree?.title}</p>
                                                                            <ul className="exp-role">
                                                                                <li className="resume-text">{item?.university_name}</li>
                                                                                <li className="resume-text">{item?.Degree?.description}</li>
                                                                            </ul>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </> : ""}
                                                        {data?.developer_educations ? <>
                                                            <h3 className="subheading-resume mb-xxl-4 mb-3">{t("expertise")}</h3>
                                                            {data?.developer_educations?.map((item) => {
                                                                return (
                                                                    <React.Fragment key={item.id}>
                                                                        <div className="exp-wrapper">
                                                                            <p className="exp-year">{ } - { } | { }</p>
                                                                            <ul className="exp-role">
                                                                                <li className="resume-text">{ }</li>
                                                                                <li className="resume-text">{ }</li>
                                                                            </ul>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </> : ""}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </section>
                <AboutCV show={showModal} handleClose={handleCloseModal} data={data?.developer_detail?.bio} id={data?.id} role={role} />
                {showExperienceModal ? <ExperienceCV show={showExperienceModal} handleClose={handleCloseExperienceModal} data={data?.developer_experiences} smallLoader={smallLoader} id={data?.id} role={role} /> : ""}
                {showEducationModal ? <EducationCV show={showEducationModal} handleClose={handleCloseEducationModal} data={data?.developer_educations} smallLoader={smallLoader} id={data?.id} role={role} /> : ""}
                {showSkillsModal ? <SkillsModal show={showSkillsModal} handleClose={handleCloseSkillsModal} data={data?.developer_skills?.skills} id={data?.id} role={role} /> : ""}
                {showSocialMediaModal ? <SocialMediaModal show={showSocialMediaModal} handleClose={handleCloseSocialMediaModal} data={data?.social_links} id={data?.id} role={role} /> : ""}
                {showExpertiseModal ? <ExpertiseModal show={showExpertiseModal} handleClose={handleCloseExpertiseModal} /> : ""}
                <DeveloperDetails show={developerDetails} handleClose={handleClosDeveloperDetails} position={data?.developer_detail?.professional_title} name={data?.name} profile={data?.profile_picture} smallLoader={smallLoader} id={data?.id} role={role} />
            </>}
        </>
    )
}
export default SingleDeveloperUpdated;
