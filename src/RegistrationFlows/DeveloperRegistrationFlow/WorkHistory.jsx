import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaFilter, FaStar } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import ReactQuill from "react-quill";
import StepperHeadingSection from "../StepperHeadingSection";
import { Controller } from "react-hook-form";
import RecommendationAI from "./RecommendationAI";

const WorkHistory = ({ nestedActiveStep, control, errors,stepData }) => {
  
  return (
    <Row>
      <StepperHeadingSection nestedActiveStep={nestedActiveStep} />
      <Col md={6} className="px-md-3 px-0">
        <RecommendationAI control={control}/>
      </Col>
      <Col md={6} className="px-md-3 px-0">
        <div>
          <p className="fw-semibold mb-2">{stepData && stepData[0]?.job_title} |{ stepData && stepData[0]?.company_name}</p>
          <p className="mb-4 font-14">
            {stepData && stepData[0]?.start_date.slice(0,10)}-{stepData && stepData[0]?.end_date.slice(0,10)}
          </p>
        </div>
        <Form.Label className="font-14 fw-medium mb-2">
          Job description
        </Form.Label>
        <div id="custom-ck">
          <Controller
            name="description"
            control={control}
            rules={{ required: "Job description is required" }}
           
            render={({ field }) => (
              <ReactQuill
                {...field}
                // value={selectedRecommendation}
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
  );
};

export default WorkHistory;
