import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";
import { useFieldArray, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
// import { EXPERIENCE_OPTIONS } from "../../../helper/utlis";
import RexettButton from "../../atomic/RexettButton";
import { deleteSkill, fetchDeveloperCv, updateDeveloperSkills } from "../../Redux/Slices/DeveloperDataSlice";
import { getDeveloperDetails } from "../../Redux/Slices/ClientDataSlice";
import { EXPERIENCE_OPTIONS } from "../../constant/utils";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const ExpertiseModal = ({ show, handleClose, data, id, role }) => {
  const userId = localStorage.getItem("userId");
  const [selectedOption, setSelectedOption] = useState();
  const { smallLoader } = useSelector((state) => state.developerData);
  const [options, setOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const { skillList } = useSelector((state) => state.clientData);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    reset,
    trigger,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      skills: [
        {
          skill: "",
          experience: "",
        },
      ],
    },
  });

  console.log(data, "data");

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "skills",
    rules: {
      required: t("required_message"),
    },
  });
  useEffect(() => {
    setSkillOptions(skillListMapped);
    if (data?.length) {
      let formattedData = [];
      formattedData = data?.map((curElem) => {
        const skill = {
          label: curElem.skill,
          value: curElem.skill,
          id: curElem.id,
        };
        return {
          ...curElem,
          skill: skill,
        };
      });
      setValue("skills", formattedData)
    } else {
      setValue("skills", [{ skill: "", experience: "" }]);
    }
  }, [dispatch]);

  const handleAppend = () => {
    const expertise = watch("skills");
    const index = expertise.findIndex(
      (curElem) => curElem.experience === "" || curElem.skill === ""
    );
    if (index === -1) {
      append({
        skill: "",
        experience: "",
      });
    }
  };
  const handleDelete = (skill_id, index) => {
    remove(index);
    if (skill_id) {
      dispatch(
        deleteSkill(id, skill_id, () => {
          if (role == "developer") {
            dispatch(fetchDeveloperCv());
          } else {
            dispatch(getDeveloperDetails(id));
          }
          handleClose();
        })
      );
    }
  };
  // const skillListMapped = skillList.map((item) => {
  //     return { value: item.id, label: item.title };
  // });

  // useEffect(() => {
  //     if (data) {
  //         const array = data
  //             .split(",")
  //             .map((tech) => ({ label: tech.trim(), value: tech.trim() }));
  //         setSelectedOption(array);
  //     }
  // }, [data]);

  // useEffect(() => {
  //     setSkillsCate(skillListMapped)
  // }, [skillList]);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     let convertString = selectedOption.map((item) => item.label);
  //     if (role === "developer") {
  //         let data = {
  //             skills: convertString.toString(),
  //             user_id: +id,
  //         };
  //         dispatch(
  //             updateDeveloperSkills(data, () => {
  //                 dispatch(fetchDeveloperCv());
  //                 handleClose();
  //             })
  //         );
  //     } else {
  //         let data = {
  //             skills: convertString.toString(),
  //             user_id: +id,
  //         };
  //         dispatch(
  //             updateDeveloperSkills(data, () => {
  //                 dispatch(getDeveloperDetails(id));
  //                 handleClose();
  //             })
  //         );
  //     }
  // };
  // const handleExperience = () => {

  // }

  // const handleAppend = async () => {
  //     // Trigger validation for all fields
  //     append({
  //         skills: "",
  //         experience: ""
  //     });
  //     const isValid = await trigger();
  //     console.log(isValid,"isValid")
  //     // Check if all fields are valid
  //     if (isValid) {
  //         append({
  //             skills: "",
  //             experience: ""
  //         });
  //     }
  // };
  const addtooltip = <Tooltip id="tooltip">{t("addRow")}</Tooltip>;

  // const filteredOptions = options.filter(
  //     (option) =>
  //         !selectedOption.find((selected) => selected.value === option.value)
  // );

  const onChangeSelect = (val, index) => {
    const newOption = createOption(val);
    setSkillOptions((prev) => [...prev, newOption]);
    setValue(`skills.${index}.skill`, newOption);
    setSelectedOption(newOption);
  };
  const onSubmit = (values) => {
    let skills = [];
    skills = values?.skills?.map(({ skill, experience }) => {
      return { skill: skill.label, experience: experience };
    });
    const payload = {
      user_id: id,
      skills: [...skills],
    };
    dispatch(
      updateDeveloperSkills(payload, role ,() => {
        if (role == "developer") {
          dispatch(fetchDeveloperCv());
        } else {
          dispatch(getDeveloperDetails(id));
        }
        handleClose();
      })
    );
    // commented for future use
    // if (data.length) {
    //   dispatch(
    //     updateDeveloperSkills(
    //       payload,
    //       () => {
    //         dispatch(fetchDeveloperCv());
    //         handleClose();
    //       },
    //       "put"
    //     )
    //   );
    // } else {
    //   dispatch(
    //     updateDeveloperSkills(
    //       payload,
    //       () => {
    //         dispatch(fetchDeveloperCv());
    //         handleClose();
    //       },
    //       "post"
    //     )
    //   );
    // }
  };
  return (
    <>
      <h3 className="popup-heading">{t("expertise")}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <div className="experience-container">
                <Row>
                  <Col md="12">
                    <Form.Group className="mb-4">
                      <Form.Label className="common-label">
                        {t("enterSkill")}
                      </Form.Label>
                      <CreatableSelect
                        {...register(`skills.${index}.skill`, {
                          required: {
                            value: true,
                            message: t("required_message"),
                          },
                        })}
                        isClearable
                        options={skillOptions}
                        onChange={(newValue) => {
                          console.log(newValue, "newvalue");
                          setSelectedOption(newValue);
                          setValue(`skills.${index}.skill`, newValue);
                          clearErrors(`skills.${index}.skill`);
                        }}
                        onCreateOption={(val) => {
                          onChangeSelect(val, index);
                        }}
                        value={watch(`skills.${index}.skill`)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {errors?.skills?.[index]?.skill && (
                  <p className="error-message">
                    {errors?.skills[index]?.skill?.message}
                  </p>
                )}
              </div>
              <div className="flex-none">
                <Form.Label className="common-label">
                  {t("experience")}
                </Form.Label>
                <Form.Select
                  {...register(`skills.${index}.experience`, {
                    required: {
                      value: true,
                      message: t("required_message"),
                    },
                  })}
                  className="filter-select shadow-none"
                  //   onChange={(e) => handleExperience(e)}
                >
                  <option value=""> {t("selectExperience")} </option>
                  {EXPERIENCE_OPTIONS.map(({ label, value }, index) => (
                    <option value={value} key={index}>
                      {label} {t("years")}
                    </option>
                  ))}
                </Form.Select>
                {errors?.skills?.[index]?.experience && (
                  <p className="error-message">
                    {errors?.skills[index]?.experience?.message}
                  </p>
                )}
              </div>
              {watch("skills")?.length !== 1 && (
                <Col md="12" className="d-flex justify-content-end">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(field?.skill?.id, index)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              )}
            </Fragment>
          ))}
          <div className="text-end mb-3">
            <OverlayTrigger placement="bottom" overlay={addtooltip}>
              <Button className="main-btn py-2 px-3" onClick={handleAppend}>
                +
              </Button>
            </OverlayTrigger>
          </div>
          <div className="text-center">
            <RexettButton
              type="submit"
              text="Submit"
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>

          {/* <div className="experience-container">
            <Row>
              <Col md="12">
                <Form.Group className="mb-4">
                  <Form.Label className="common-label">
                    {t("Enter Skills")}
                  </Form.Label>
                  <CreatableSelect
                    isMulti
                    isClearable
                    name={selectedOption}
                    onChange={(newValue) => {
                        setSelectedOption(newValue)
                    }}
                    // onCreateOption={onChangeSelect}
                    options={skillCate}
                    value={selectedOption}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div> */}
          {/* <div className="flex-none">
            <Form.Label className="common-label">{t("experience")}</Form.Label>
            <Form.Select
              className="filter-select shadow-none"
              onChange={(e) => handleExperience(e)}
            >
              <option value=""> {t("selectExperience")} </option>
              {EXPERIENCE_OPTIONS.map(({ label, value }, index) => (
                <option value={value} key={index}>
                  {label} {t("years")}
                </option>
              ))}
            </Form.Select>
          </div> */}
          {/* <p className="error-message">
                            {errors.professional_title?.message}
                        </p> */}

          {/* <div className="text-end mb-3">
            <OverlayTrigger placement="bottom" overlay={addtooltip}>
              <Button className="main-btn py-2 px-3" onClick={handleAppend}>
                +
              </Button>
            </OverlayTrigger>
          </div>
          <div className="text-center">
            <RexettButton
              type="submit"
              text="Submit"
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div> */}
        </form>
    </>

  );
};

export default ExpertiseModal;
