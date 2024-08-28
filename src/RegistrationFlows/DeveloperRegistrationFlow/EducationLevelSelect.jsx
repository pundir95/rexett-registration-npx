import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { EDUCATION_LEVEL } from '../../common/JobPostForm/Constant'

const EducationLevelSelect = ({handleEducationLevel}) => {
  return (
    <div>
    <h2 className="resume-heading">
        What best describes your level of education?
    </h2>
    <p className="fw-semibold text-offwhite">Select the best option and we'll help you structure your education section.</p>
    <Row className="justify-content-center">
        <Col md={10}>
            <div>
                <div className="mt-md-5 mt-4">
                    <div className="selection-wrapper">
                    
                        {
                            EDUCATION_LEVEL.map((item)=>{
                                return (
                                    <>
                                     <span onClick={()=>handleEducationLevel(item.label)} className="education-selection">{item?.label}</span>
                                    </>
                                )
                            })
                        }
                    </div>
                    <div className="text-center mt-3">
                        <Link to={'/add-education'} className="text-white text-decoration-underline font-14 fw-medium">Pefer not to answer</Link>
                    </div>
                </div>
            </div>
        </Col>
    </Row>
</div>
  )
}

export default EducationLevelSelect