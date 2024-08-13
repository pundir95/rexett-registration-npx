import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StepperHeadingSection from "../StepperHeadingSection";
import { FaArrowLeft } from "react-icons/fa6";
import JobPostStep3 from "../../common/JobPostForm/JobPost3";
import { getDegreeList } from "../../Redux/Slices/ClientDataSlice";
import { useDispatch, useSelector } from "react-redux";

const ScreeningSection = ({
  activeStep,
  register,
  control,
  errors,
  setValue,
  watch,
}) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDegreeList())
  }, [])

  const {degreeList} = useSelector(state => state.clientData)

  const SCREENING_OPTIONS = [
    {
      optionId: 1,
      label: "Work Experience",
      title: "",
      question_type: "",
      question: "How many years of experience do you currently have?",
    },
    {
      optionId: 2,
      label: "Education",
      question_type: "Degree",
      title: "",
      question: "Have you completed the following level of education: [Degree]",
      ideal_answer: "Yes",
      uniqueId: "2",
    },
    {
      optionId: 3,
      label: "Language",
      title: "",
      question_type: "language",
      question: "What is your level of proficiency in [Language]?",
      uniqueId: "3",
    },

    {
      optionId: 4,
      label: "Location",
      title: "",
      question_type: "",
      ideal_answer: "Yes",
      question: "Are you comfortable commuting to this job's location?",
    },
    {
      optionId: 5,
      label: "Remote Work",
      title: "",
      question_type: "",
      question: "Are you comfortable working in a remote setting?",
      ideal_answer: "Yes",
    },
    {
      optionId: 6,
      label: "Expertise with Skill",
      title: "",
      question_type: "Skill",
      question: "Have many years of work experience do you have with [Skill]?",
    },
    {
      optionId: 7,
      label: "Onsite Work",
      title: "",
      question: "Are you comfortable working in an onsite setting?",
      // inputType: "",
      ideal_answer: "Yes",
      uniqueId: "1",
    },
    {
      optionId: 8,
      label: "Custom question",
      title: "",
      question_type: "custom",
      question: "",
      responseType: "",
      // inputType: "",
      ideal_answer: "",
    },
  ];
  const YES_NO_OPTIONS = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ];
  return (
    <>
      <div>
        <Row>
          <Col md={12}>
            <StepperHeadingSection activeStep={activeStep} type={'client'} />
            <p className="font-12 fw-medium">* includes a required field</p>
            <JobPostStep3
              degreeList={degreeList}
              register={register}
              control={control}
              errors={errors}
              watch={watch}
              isRegistrationStep={true}
              setValue={setValue}
              invalidFieldRequired={true}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ScreeningSection;
