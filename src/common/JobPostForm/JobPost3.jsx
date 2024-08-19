import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { Controller, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CommonInput from "../../atomic/CommonInput";
import CreatableSelect from "react-select/creatable";


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

const JobPostStep3 = ({
  degreeList,
  register,
  errors,
  control,
  watch,
  setValue,
  isRegistrationStep = false,
  invalidFieldRequired = false,
}) => {
  const { t } = useTranslation();
  const [degree, setDegree] = useState()
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "screening_questions",
  });


  console.log(degree, "degreeeeee")
  console.log(degreeList,"degreeList")

  const handleOnChange = (item) => {
    console.log(item, "event")
    setDegree(item)

  }
  const handleAddField = (opt) => {
    // remember to remove label while posting data
    append({
      question_type: opt.question_type,
      question: opt.question,
      title: opt?.title,
      ideal_answer: opt?.ideal_answer ? opt.ideal_answer : "",
      must_have: false,
      alreadyYes: opt?.alreadyYes ? opt?.alreadyYes : null,
      optionId: opt.optionId,
    });
    {
      opt?.responseType && append({ responseType: "yes/no" });
    }
  };
  const isFieldAlreadyAdded = (optId) => {
    const screeningQuestions = watch("screening_questions");
    const index = screeningQuestions?.findIndex(
      (curElem, index) => curElem.optionId === optId
    );
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <section className="job-post-section">
        {!isRegistrationStep && (
          <>
            <h4 className="section-head font-18 border-0 mb-1 pb-0">
              Screening questions
            </h4>
            <p className="font-14">We recommend adding 3 or more questions.</p>
          </>
        )}
        {fields.map((field, idx) =>
          field?.question_type === "custom" ? (
            <div className="screening-wrapper mb-4">
              <div>
                <div className="d-flex justify-content-between align-items-center screen-wrapper-heading gap-5">
                  <Form.Control
                    {...register(`screening_questions.${idx}.question`, {
                      required: "This field is required",
                    })}
                    type="text"
                    // value={watch(`screening_questions.${idx}.question`)}
                    className={`common-field font-14 bg-white ${invalidFieldRequired &&
                      errors?.screening_questions?.[idx].question?.message &&
                      "invalid-field"
                      }`}
                    placeholder="Try asking a question"
                  />
                  <Button
                    variant="transparent"
                    className="border-0 p-0"
                    onClick={() => remove(idx)}
                  >
                    <IoClose />
                  </Button>
                </div>
                {errors?.screening_questions?.[idx]?.question && (
                  <p
                    className={`${invalidFieldRequired ? "field-error" : "error-message"
                      }`}
                  >
                    {errors?.screening_questions?.[idx].question?.message}
                  </p>
                )}
              </div>
              <Row className="align-items-start screening-grid mx-0 py-3">
                <Col md="4" className="mb-md-0 mb-4">
                  <Form.Group>
                    <Form.Label className="font-14">Response Type</Form.Label>
                    <Form.Select
                      className={`common-field font-14`}
                      {...register(`screening_questions.${idx}.responseType`)}
                    // onChange={(e) =>
                    //   setValue(
                    //     `screening_questions.${idx}.responseType`,
                    //     e.target.value
                    //   )
                    // }
                    >
                      <option value="yes/no" selected>
                        Yes/No
                      </option>
                      <option value="subjective">Subjective</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md="4" className="mb-md-0 mb-4">
                  <Form.Group>
                    <Form.Label className="font-14">Ideal answer</Form.Label>
                    <div className="d-flex align-items-center gap-3">
                      {watch(`screening_questions.${idx}.responseType`) ===
                        "yes/no" ? (
                        <>
                          <Controller
                            name={`screening_questions.${idx}.ideal_answer`}
                            control={control}
                            rules={{ required: `This field  is required` }}
                            render={({ field }) =>
                              YES_NO_OPTIONS?.map((option, index) => (
                                <Form.Check
                                  {...field}
                                  key={index}
                                  type="radio"
                                  label={option.label}
                                  value={option.value}
                                  checked={field.value === option.value}
                                  onChange={(e) =>
                                    field.onChange(e.target.value)
                                  }
                                />
                              ))
                            }
                          />
                        </>
                      ) : (
                        <Form.Control
                          {...register(
                            `screening_questions.${idx}.ideal_answer`,
                            { required: "This field is required" }
                          )}
                          type="text"
                          className="common-field font-14"
                          placeholder="Enter Answer"
                        />
                      )}
                    </div>
                    {errors?.screening_questions?.[idx]?.ideal_answer && (
                      <p
                        className={`${invalidFieldRequired ? "field-error" : "error-message"
                          }`}
                      >
                        {
                          errors?.screening_questions?.[idx].ideal_answer
                            ?.message
                        }
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col md="4" className="mb-md-0 mb-4">
                  <Form.Check
                    type="checkbox"
                    {...register(`screening_questions.${idx}.must_have`, {
                      // required: t("required_message"),
                    })}
                    className="font-14 job-post-checkbox"
                    id="must2"
                    label="Must have qualification"
                  />
                </Col>
              </Row>
            </div>
          ) : (
            <>
              <div key={field.id} className="screening-wrapper mb-4">
                <div className="d-flex justify-content-between align-items-center screen-wrapper-heading">
                  <h3 className="mb-0">{field.question}</h3>
                  <span className="recommended-badge">{field?.isRecommended && "Recommended"}</span>
                  <Button
                    variant="transparent"
                    className="border-0 p-0 text-white"
                    onClick={() => remove(idx)}
                  >
                    <IoClose />
                  </Button>
                </div>
                <Row className="screening-grid py-3 mx-0">
                  <Col md="4" className="mb-md-0 mb-4">
                    <Form.Group>
                      {field?.question_type && field?.question_type === "Degree" && (
                        <>
                          <Form.Label className="font-14">{"Degree"}</Form.Label>
                          <div className="common-field">
                            <CreatableSelect
                              {...register(`screening_questions.${idx}.title`,
                                { required: t("required_message") }
                              )}
                              isClearable
                              onChange={(val) =>
                                setValue(
                                  `screening_questions.${idx}.title`,
                                  val ? val.label : ""
                                )
                              }
                              options={degreeList}
                            />
                          </div>
                           {/* {errors?.screening_questions[idx].Degree && (
                              <p className="error-message">
                                {errors.screening_questions[idx].Degree.message}
                              </p>
                            )} */}
                        </>
                      )}
                      {field?.question_type && field?.question_type === "language" && (
                        <>
                          <Form.Label className="font-14">{field?.question_type}</Form.Label>
                          <Form.Control
                            type="text"
                            {...register(`screening_questions.${idx}.title`, {
                              required: t("required_message"),
                            })}
                            className="common-field font-14"
                            placeholder={`Enter ${field?.question_type} name`}
                          />
                        </>
                      )}

                      {/* Uncommented block for non-custom types */}
                      {/* <Form.Label className="font-14">{field?.question_type}</Form.Label>
                          <Form.Control
                            type="text"
                            {...register(`screening_questions.${idx}.title`, {
                              required: t("required_message"),
                            })}
                            className="common-field font-14"
                            placeholder={`Enter ${field?.question_type} name`}
                          /> */}
                    </Form.Group>

                    {errors?.screening_questions?.[idx]?.title && (
                      <p
                        className={`${invalidFieldRequired ? "field-error" : "error-message"
                          }`}
                      >
                        {errors?.screening_questions?.[idx].title?.message}
                      </p>
                    )}
                  </Col>
                  <Col md="4" className="mb-md-0 mb-4">
                    <Form.Group>
                      <Form.Label className="font-14">Ideal answer</Form.Label>
                      {field?.ideal_answer === "Yes" ? (
                        <Form.Control
                          type="text"
                          readOnly
                          {...register(
                            `screening_questions.${idx}.ideal_answer`,
                            {
                              required: t("required_message"),
                            }
                          )}
                          value="Yes"
                          className="common-field font-14"
                          placeholder="Enter Answer"
                        />
                      ) : field?.question_type === "language" ? (
                        <>
                          <Form.Select className="common-field"
                            {...register(
                              `screening_questions.${idx}.ideal_answer`,
                              {
                                required: t("required_message"),
                              }
                            )}
                          >
                            <option selected value="conversational">
                              Conversational
                            </option>
                            <option value="none">None</option>
                            <option value="professional">Professional</option>
                            <option value="nativeOrBilingual">
                              Native or bilinguals
                            </option>
                          </Form.Select>
                        </>
                      ) : (
                        <Form.Control
                          type={
                            field?.question_type === "Years" ||
                              "Expertise with Skill"
                              ? "number"
                              : "text"
                          }
                          min={field?.question_type === "Years" ? 0 : null}
                          {...register(
                            `screening_questions.${idx}.ideal_answer`,
                            {
                              required: t("required_message"),
                            }
                          )}
                          className="common-field font-14"
                          placeholder="Enter Answer"
                        />
                      )}
                      {/* <Form.Control
                          type="text"
                          {...register(`screening_questions.${idx}.ideal_answer`, {
                            required: t("required_message"),
                          })}
                          className="common-field font-14"
                          placeholder="Enter Answer"
                        /> */}
                    </Form.Group>
                    {errors?.screening_questions?.[idx]?.ideal_answer && (
                      <p
                        className={`${invalidFieldRequired ? "field-error" : "error-message"
                          }`}
                      >
                        {
                          errors?.screening_questions?.[idx].ideal_answer
                            ?.message
                        }
                      </p>
                    )}
                  </Col>
                  <Col md="4" className="pb-md-2 align-self-center">
                    <Form.Group>
                      <Form.Check
                        type="checkbox"
                        {...register(`screening_questions.${idx}.must_have`, {
                          // required: t("required_message"),
                        })}
                        className="font-14 job-post-checkbox"
                        id="must2"
                        label="Must have qualification"
                      />
                    </Form.Group>
                    {errors?.screening_questions?.[idx]?.must_have && (
                      <p
                        className={`${invalidFieldRequired ? "field-error" : "error-message"
                          }`}
                      >
                        {errors?.screening_questions?.[idx]?.must_have?.message}
                      </p>
                    )}
                  </Col>
                </Row>
              </div>
            </>
          )
        )}

        {/* <div className="screening-wrapper mb-4">
          <div className="d-flex justify-content-between align-items-center screen-wrapper-heading gap-5">
            <Form.Control
              type="text"
              className="common-field font-14 bg-white"
              placeholder="Try asking a question"
            />
            <Button variant="transparent" className="border-0 p-0">
              <IoClose />
            </Button>
          </div>
          <Row className="align-items-start screening-grid">
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Response Type</Form.Label>
                <Form.Select className="common-field font-14">
                  <option value="yes/no">Yes/No</option>
                  <option value="subjective">Subjective</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer</Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <Form.Check
                    type="radio"
                    name="ideal-radio"
                    className="font-14"
                    label="Yes"
                    id="ideal-yes"
                  />
                  <Form.Check
                    type="radio"
                    name="ideal-radio"
                    className="font-14"
                    label="No"
                    id="ideal-no"
                  />
                </div>
              </Form.Group>
            </Col>
            <Col md="4" className="mb-md-0 mb-4">
              <Form.Group>
                <Form.Label className="font-14">Ideal answer</Form.Label>
                <Form.Control
                  type="text"
                  className="common-field font-14"
                  placeholder="Enter Answer"
                />
              </Form.Group>
            </Col>
          </Row>
        </div> */}

        <p className="font-14 mb-2">Add screening questions:</p>
        <div className="mb-3">
          {SCREENING_OPTIONS.map((curElem, idx) => (
            <Button
              key={idx}
              onClick={() => {
                handleAddField(curElem);
              }}
              disabled={isFieldAlreadyAdded(curElem?.optionId)}
              // disabled={() => {
              //   isFieldAlreadyAdded(curElem?.title);
              // }}
              variant="transparent"
              className="outline-main-btn px-4 py-2 d-inline-block me-1 mb-1 rounded-full cursor-pointer"
            >
              {isFieldAlreadyAdded(curElem?.optionId) ? (
                <FiCheck />
              ) : (
                <FiPlus />
              )}
              {curElem.label}
            </Button>
          ))}
        </div>
        <h4 className="section-head font-18 border-0 pb-0 mb-2">
          Qualification Settings
        </h4>

        <Form.Group className="mb-4">
          <Form.Check
            type="checkbox"
            {...register("qualification_filter_out")}
            className="font-14 job-post-checkbox"
            id="filter-check"
            label="Filter out and send rejections to applicants who don't meet any must have qualifications."
          />
          {errors?.qualification_filter_out && (
            <p
              className={`${invalidFieldRequired ? "field-error" : "error-message"
                }`}
            >
              {errors.qualification_filter_out?.message}
            </p>
          )}
        </Form.Group>
      </section>
    </div>
  );
};

export default JobPostStep3;
