import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import resumeImg from '../../../assets/img/user-img.jpg'
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { MdEditNote, MdEmail } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const DeveloperCvComp = ({ developerDetails, data, role, handleShowModal, handleShowExperienceModal, handleShowExpertiseModal,
    handleShowSocialMediaModal, handleDeveloperDetails, handleShowSkillsModal, handleShowEducationModal }) => {

    const { t } = useTranslation()
    const [readmore, setReadMore] = useState(true)


    const readMoreLess = () => {
        setReadMore(!readmore)
    }

    const splitSkills = (data) => {
        let skills = data?.skills?.split(",")
        return skills

    }
    return (
        <Row>
            <Col lg={6} className="px-0">
                <div className="resume-basic-info text-center">
                    <div className="resume-imgbx mx-auto mb-4">
                        <img src={data?.profile_picture ? data?.profile_picture : resumeImg} className="resume-img" />
                    </div>
                    <h3 className="resume-name">{data?.name}</h3>
                    <p className="resume-designation">{data?.developer_detail?.professional_title}</p>
                    {role !== "client" && <div className="add_more_section_detail" onClick={handleDeveloperDetails}><MdEditNote size={25} /></div>}
                </div>
                <div className="connect-social-media px-3">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume text-center mb-0">{t("skills")}</h3>
                        {role !== "client" && <div className="add_more_section" onClick={handleShowSkillsModal}><MdEditNote size={25} /></div>}
                    </div>
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
                <div className="connect-social-media px-3">
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume text-center mb-0">{t("connectWithMe")}</h3>
                        {role !== "client" && <div className="add_more_section" onClick={handleShowSocialMediaModal}><MdEditNote size={25} /></div>}
                    </div>
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
                            {data?.developer_detail?.github_url ? <Link className="social-media-link" to={data?.developer_detail?.github_url} ><FaGithub /></Link> : ""}
                        </li>
                        <li>
                            {data?.developer_detail?.linkedin_url ? <Link className="social-media-link" to={data?.developer_detail?.linkedin_url}><FaLinkedin /></Link> : ""}
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
                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                            <h3 className="subheading-resume mb-0">{t("aboutMe")}</h3>
                            {/* <h2 className="mainheading-resume">Art Changes Us</h2> */}
                            {role !== "client" && <div className="add_more_section" onClick={handleShowModal}><MdEditNote size={25} /></div>}
                        </div>
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
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume mb-0">{t("experience")}</h3>
                        {role !== "client" && <div className="add_more_section" onClick={handleShowExperienceModal}><MdEditNote size={25} /></div>}
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
                        <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                            <h3 className="subheading-resume mb-0">{t("education")}</h3>
                            {role !== "client" && <div className="add_more_section_education pointer" onClick={handleShowEducationModal}><MdEditNote size={25} /></div>}
                        </div>
                        {data?.developer_educations?.map((item) => {
                            return (
                                <React.Fragment key={item.id}>
                                    <div className="exp-wrapper">
                                        <p className="exp-year">{item?.start_year} - {item?.end_year ? item?.end_year : "Present"} | {item?.Degree?.title}</p>
                                        <ul className="exp-role">
                                            <li className="resume-text">{item?.university_name}</li>
                                            <li className="resume-text">{item?.Degree?.title}</li>
                                        </ul>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </> : ""}
                    <div className="d-flex justify-content-between align-items-center cv-header-wrapper mb-xxl-4 mb-3">
                        <h3 className="subheading-resume mb-0">{t("expertise")}</h3>
                        {role !== "client" && <div className="add_more_section_education pointer" onClick={handleShowExpertiseModal}><MdEditNote size={25} /></div>}
                    </div>
                    {data?.developer_skill_and_experience ? <>
                        {data?.developer_skill_and_experience?.map(({ experience, skill, skill_icon }, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="exp-wrapper expertise-card">
                                        {/* <p className="exp-year">{} - {} | {}</p> */}
                                        <img src={skill_icon?.icon_url} />
                                        <p className="expertise-skill">{skill}</p>
                                        <p className="expertise-exp">{experience}</p>

                                        {/* <ul className="exp-role">
                                                            <li className="resume-text">{}</li>
                                                            <li className="resume-text">{}</li>
                                                        </ul> */}
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </> : ""}
                </div>
            </Col>
        </Row>
    )
}

export default DeveloperCvComp