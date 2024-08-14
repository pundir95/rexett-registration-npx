import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ClientStep1 from "./ClientStep1";
import SidebarSection from "../SidebarSection";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import RegistrationType from "./RegistrationType";
import { FaArrowLeft } from "react-icons/fa6";
import { DEFAULT_SCREENING_DATA, getActiveStepFields, MODAL_INFORMATION, SIDEBAR_ITEMS } from "../../helper/RegisterConstant";
import RexettButton from "../../atomic/RexettButton";
import { applyAsClient, clientJobPost, getCoutriesList, getJobPost, getProfile, getStatesList, uploadFileToS3Bucket } from "../../Redux/Slices/ClientDataSlice";
import { useTranslation } from "react-i18next";
import { getSkillOptions } from "../../Redux/Slices/DeveloperDataSlice";
import SetUpJobModal from "../../common/Modals/SetUpJobModal";
import ScreeningSection from "./ScreeningSection";
import JobDesciptionStep from "./JobDescriptionStep";

  const ClientRegistrationStepper = () => {
  const dispatch = useDispatch();
  const { smallLoader } = useSelector((state) => state?.clientData);
  const [text, setText] = useState("");
  const [details, setDetails] = useState()
  const [activeStep, setActiveStep] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [registrationType, setRegistrationType] = useState("individual"); //for register as indivisual or company
  const [showSetUpModal, setShowSetUpJobModal] = useState(false);
  const activeStepFields = getActiveStepFields(activeStep, registrationType);
  const { profileData } = useSelector((state) => state?.clientData)
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
    watch,
    setError,
    setValue,
    clearErrors,
  } = useForm({
    defaultValues: {
      skills: [{ title: "", level: "" }],
      screening_questions: DEFAULT_SCREENING_DATA,
    },
  });
  const { skillOptions } = useSelector((state) => state.developerData);
  const { t } = useTranslation()
  const [countryCode , setCountryCode] = useState()
  let arrPercentage=[0,0,30,40,50,70,80,100]
  useEffect(() => {
    const storedStep = localStorage.getItem("clientActiveStep");
    if (storedStep) {
      setActiveStep(Number(storedStep));
    }
  }, []);
  useEffect(() => {
    if (activeStep == 1) {
      dispatch(getCoutriesList());
    }
    if (activeStep == 3) {
      dispatch(getSkillOptions());
    }
  }, [activeStep]);
  const user_id = localStorage.getItem("clientId")

  useEffect(() => {
    const activeStepKeys = {
      1: "step1",
      2: "step2",
      3: "step3",
      4: "step4",
    }
    if (user_id) {
      dispatch(getProfile(user_id, (data) => {
        for (let key in data) {
          if (activeStep === 1) {
            if (key === "country_code") {
              const newValue = {
                label: data["country"],
                value: data[key],
              };
              setCountryCode(newValue?.value)
              setValue(key, newValue);
            } else if (key === "state_iso_code") {
              const newValue = { label: data["state"], value: data[key] };
              setValue(key, newValue);
            } else if (key === "time_zone") {
              const newValue = { label: data[key], value: data[key] };
              setValue(key, newValue);
            } else {
              setValue(key, data[key])
            }
            if (key === "name") {
              const [firstName, surname] = data[key]?.split(" ");
              setValue("first_name", firstName)
              setValue("last_name", surname)
            }
            if (key === "address") {
              setValue("company_address", data[key])
            }
            if (key === "tax_id") {
              setValue("company_tax_id", data[key])
            }
          } else if (activeStep !== 1) {
            setValue(key, data[key])
          }

        }
      }))
    }
  }, [activeStep, user_id])

  const getActiveStepText = (values) => {
    switch (activeStep) {
      case 1:
        return "Next : Setup Job";
      case 2:
        return "Next : Job Description";
      case 3:
        return "Next:Screening Info";
      case 4:
        return "Submit";
    }
  };
  const onSubmit = () => {
    if (activeStep === 1 || activeStep == 4) {
      setShowSetUpJobModal(true);
    } else {
      increaseStepCount();
    }
    const buttonText = getActiveStepText();
    switch (buttonText) {
      case "Next : Job Description":
        callJobStep1API();
        break;
      case "Next:Screening Info":
        callJobStep2API();
        break;
      case "Submit":
        callJobStep3API();
    }
  };
  const jobStepData = watch();
  const callJobStep1API = () => {
    const stepData = watch();
    let payload = {
      step: 1,
      title: jobStepData?.job_title,
      contract_type: jobStepData?.contract_type,
      job_location: jobStepData?.job_location,
      job_positions: jobStepData?.job_positions,
      job_type: jobStepData?.job_type,
    }
    dispatch(clientJobPost(payload, activeStep, user_id))
  }
  const job_id = localStorage.getItem("jobId")
  const jobSkills = jobStepData?.skills?.map(skill => ({
    skill_id: skill?.title?.value,
    skill_name: skill?.title?.label,
    weight: skill?.level?.label,
  }));
  console.log(jobSkills,"jobSkills")

  const screeningQuestions = jobStepData?.screening_questions?.map(ques => (
    {
      title: ques?.title,
      question: ques?.question,
      ideal_answer: ques?.ideal_answer,
      must_have: ques?.must_have,
      question_type: ques?.question_type,
    }
  ))
  const callJobStep2API = () => {
    if (job_id) {
      let payload = {
        step: 2,
        job_id: job_id,
        description: jobStepData?.description,
        job_skills: jobSkills,
      }
      dispatch(clientJobPost(payload, activeStep, user_id))
    }
  }

  const callJobStep3API = () => {
    const stepData = watch();
    let payload = {
      step: 3,
      job_id: job_id,
      user_id: user_id,
      qualification_filter_out: jobStepData?.qualification_filter_out,
      screening_questions: screeningQuestions,
    }
    dispatch(clientJobPost(payload, activeStep, user_id))
  }


  const increaseStepCount = () => {
    if (activeStep === 4) {
      localStorage.removeItem("clientActiveStep");
    } else {
      setActiveStep((prev) => prev + 1);
      localStorage.setItem("clientActiveStep", activeStep + 1);
    }
  };
  const decreaseStepCount = () => {
    setActiveStep((prev) => prev - 1);
    localStorage.setItem("clientActiveStep", activeStep - 1);
  };
  const renderActiveStep = () => {
    switch (activeStep) {
      case 1:
      case 2:
        return (
          // this step will be used for both first and second
          <ClientStep1
            control={control}
            errors={errors}
            activeStep={activeStep}
            type={"client"}
            register={register}
            stepFields={activeStepFields}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            setValue={setValue}
            previewImage={previewImage}
            imageFile={imageFile}
            setPreviewImage={setPreviewImage}
            setImageFile={setImageFile}
            isProfileSectionRequired={activeStep === 1}
            countryCode={countryCode}
          />
        );
      case 3:
        return (
          <JobDesciptionStep
            register={register}
            stepFields={activeStepFields}
            errors={errors}
            skillOptions={skillOptions}
            activeStep={activeStep}
            watch={watch}
            setValue={setValue}
            control={control}
            type={"client"}
          />
        );
      case 4:
        return (
          <ScreeningSection
            activeStep={activeStep}
            register={register}
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            type={"client"}
          />
        );
    }
  };
  const handleSetActiveStep = (step) => {
    if (activeStep > step) {
      setActiveStep(step);
      localStorage.setItem("clientActiveStep", step);
    }
  };
  useEffect(() => {
    if (activeStep == 4) {
      setText("Submit")
    }
  }, [activeStep])

  const handleRegistrationType = (registrationType) => {
    setRegistrationType(registrationType);
    increaseStepCount();
  };
  const handleToggleSetupModal = () => {
    setShowSetUpJobModal((prev) => !prev);
  };
  const handleRedirect = () => {
    window.location.href = "https://rexett-frontend.rvtechnologies.info"
    // window.location.href= process.env.REACT_APP_BASE_URL
  }
  const handleAfterApiSuccess = () => {
    increaseStepCount();
    reset();
  };
  const handleProceed = () => {
    const stepData = watch();
    let fileData = new FormData();
    fileData.append("file", imageFile?.profile_picture)
    setShowSetUpJobModal(false);
    dispatch(uploadFileToS3Bucket(fileData, (url) => {
      const payload = {
        first_name: stepData?.first_name, 
        last_name: stepData?.last_name,
        password: stepData?.password,
        profile_picture: url,
        country_code: stepData?.country_code?.value,
        state_iso_code: stepData?.state_iso_code?.value,
        email: stepData?.email,
        country_code: stepData?.country_code?.value,
        yearly_revenue: stepData?.yearly_revenue,
        tax_id: stepData?.company_tax_id,
        address: stepData?.company_address,
        country: stepData?.country_code?.label,
        state: stepData?.state_iso_code?.label,
        phone_number: stepData?.phone_number,
        passcode: stepData?.passcode,
        time_zone: stepData?.time_zone?.label

      }
      dispatch(applyAsClient(payload, handleAfterApiSuccess));
    })
    );
  };
  return (
    <>
      <div>
        {activeStep === 0 ? (
          <RegistrationType handleRegistrationType={handleRegistrationType} />
        ) : (
          <section className="resume-section-wrapper">
            <SidebarSection
              activeStep={activeStep}
              handleSetActiveStep={handleSetActiveStep}
              stepperSideBarItems={SIDEBAR_ITEMS?.client}
              arrPercentage={arrPercentage}
            />
            <div className="resume-main-wrapper">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                  <div>
                    <span onClick={decreaseStepCount} className="go-back-link text-decoration-none text-green d-inline-block mb-3 fw-medium cursor-pointer">
                      <FaArrowLeft /> Go Back
                    </span>
                  </div>
                  {renderActiveStep()}
                  <div className="d-flex justify-content-between align-items-center ">
                    <div>
                    </div>
                    <div>
                      <RexettButton
                        type="submit"
                        onClick={() => text === "Submit"}
                        text={getActiveStepText()}
                        className="main-btn px-5 mr-2"
                        disabled={smallLoader}
                        isLoading={smallLoader}
                      />
                    </div>
                  </div>
                </Container>
              </form>
            </div>
          </section>
        )}
      </div>
      {showSetUpModal ? <SetUpJobModal
        show={showSetUpModal}
        handleClose={handleToggleSetupModal}
        handleRedirect={handleRedirect}
        handleProceed={handleProceed}
        smallLoader={smallLoader}
        modalData={MODAL_INFORMATION[activeStep]}
        activeStep={activeStep}
      /> : ""}
      {/* <ThankRegister
        show={showthanksregister}
        handleClose={handleCloseThanksRegister}
      /> */}
    </>
  );
};

export default ClientRegistrationStepper;
