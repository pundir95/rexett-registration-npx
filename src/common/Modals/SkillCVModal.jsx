import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchDeveloperCv,
//   updateDeveloperSkills,
// } from "../../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
// import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";
import CreatableSelect from "react-select/creatable";
import RexettButton from "../../atomic/RexettButton";
import { fetchDeveloperCv, updateDeveloperSkills } from "../../Redux/Slices/DeveloperDataSlice";
import { getDeveloperDetails } from "../../Redux/Slices/ClientDataSlice";

const createOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const SkillsModal = ({ show, handleClose, data, id, role }) => {
  const { skillList } = useSelector((state) => state.clientData);
  const [selectedOption, setSelectedOption] = useState([]);
  const { smallLoader } = useSelector((state) => state.developerData);
  const skillListMapped = skillList.map((item) => {
    return { value: item.id, label: item.title };
  });
  const [skillCate, setSkillsCate] = useState(skillListMapped);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  console.log(data, "data,,,,");

  useEffect(() => {
    if (data) {
      const array = data?.map((tech) => ({
        label: tech.skill,
        value: tech.skill,
        id: tech.id,
      }));
      setSelectedOption(array);
    }
  }, [data]);
  console.log(selectedOption, "selectedOption");

  const handleSubmit = (e) => {
    e.preventDefault();
    let formattedSkills = [];
    // let convertString = selectedOption.map((item) => item.label);
    formattedSkills = selectedOption.map((item) => {
      return { skill: item.label, experience: "" };
    });

    let data = {
      skills: formattedSkills,
      user_id: +id,
    };
    dispatch(
      updateDeveloperSkills(data, role, () => {
        if (role === "developer") {
          dispatch(fetchDeveloperCv());
        } else {
          dispatch(getDeveloperDetails(id));
        }
        handleClose();
      })
    );
  };

  const onChangeSelect = (val) => {
    setTimeout(() => {
      const newOption = createOption(val);
      setSelectedOption((prev) => [...prev, newOption]);
      setSkillsCate((prev) => [...prev, newOption]);
    }, 1000);
  };

  return (
    <>
    <h3 className="popup-heading">{t("skills")}</h3>
        <form onSubmit={handleSubmit}>
          <div className="experience-container">
            <Row>
              <Col md="12">
                <Form.Group className="mb-4">
                  <CreatableSelect
                    isMulti
                    isClearable
                    name={selectedOption}
                    onChange={(newValue) => {
                      setSelectedOption(newValue);
                    }}
                    onCreateOption={onChangeSelect}
                    options={skillCate}
                    value={selectedOption}
                  />
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className="text-center">
            <RexettButton
              type="submit"
              text={t("submit")}
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={smallLoader}
              isLoading={smallLoader}
            />
          </div>
        </form>
    </>
  
        
    
  );
};
export default SkillsModal;
