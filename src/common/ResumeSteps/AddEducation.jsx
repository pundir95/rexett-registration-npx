import React, { useEffect, useState } from "react";
// import rexettLogo from "../../../assets/img/rexett-logo-white.png";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheck,
  FaCirclePlay,
  FaEnvelope,
  FaGithub,
  FaLightbulb,
  FaLinkedin,
} from "react-icons/fa6";
import {
  Button,
  Col,
  Container,
  Form,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";

import ReactQuill from "react-quill";
// import PreviewModal from "./Modals/PreviewResume";
import { Controller } from "react-hook-form";
import { createOptionsForReactSelect } from "../../constant/developerStepConstant";
import RecommendationAI from "../../RegistrationFlows/DeveloperRegistrationFlow/RecommendationAI";
import ClientStep1 from "../../RegistrationFlows/ClientRegistrationFlow/ClientStep1";
const AddEducation = ({
  control,
  errors,
  activeStep,
  nestedActiveStep,
  type,
  register,
  stepFields,
  setValue,
  setError,
  clearErrors,
  watch,
  previewImage,
  imageFile,
  setPreviewImage,
  setImageFile,
  isProfileSectionRequired,
  setSelectedRecommend,
  selectedRecommend,
  skillOptions,
  name
}) => {

console.log("step6")
  console.log(name,"name")
  const [formattedSkillOptions, setFormattedSkillOptions] = useState([]);
  console.log(selectedRecommend,"selectedRecommend")
  useEffect(() => {
    if (skillOptions?.length) {
      const formattedSkillOptions = createOptionsForReactSelect(
        skillOptions,
        "id",
        "title"
      );
      setFormattedSkillOptions(formattedSkillOptions);
    }
  }, [skillOptions]);

  useEffect(()=>{
    setValue(name,selectedRecommend)

  },[selectedRecommend])

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
  return (
    <>
      <div>
        <ClientStep1
          control={control}
          errors={errors}
          activeStep={activeStep}
          nestedActiveStep={nestedActiveStep}
          type={"developer"}
          register={register}
          stepFields={stepFields}
          setError={setError}
          clearErrors={clearErrors}
          watch={watch}
          setValue={setValue}
          previewImage={previewImage}
          imageFile={imageFile}
          setPreviewImage={setPreviewImage}
          setImageFile={setImageFile}
          isProfileSectionRequired={activeStep === 1 && nestedActiveStep == 0}
          skillOptions={formattedSkillOptions}
        />
      </div>

      <Row>
        <Col md={6}>
          <div>
          <RecommendationAI control={control} setRecommend={setSelectedRecommend}/>
          </div>
        </Col>
        <Col md={6}>
          <div id="custom-ck">
          <label className="font-14 fw-medium mb-1">Description</label>
          <Controller
            name={name}
            control={control}
            rules={{ required: "Job description is required" }}
           
            render={({ field }) => (
              <ReactQuill
                {...field}
                value={field.value}
                className={`common-field ${
                  errors.description?.message && "invalid-field"
                }`}
                theme="snow"
                onChange={(content, delta, source, editor) => field.onChange(content)}
              />
            )}
          />
          {errors?.description && (
            <p className="field-error">{errors.description?.message}</p>
          )}
        </div>
        </Col>
      </Row>
    </>
  );
};
export default AddEducation;
