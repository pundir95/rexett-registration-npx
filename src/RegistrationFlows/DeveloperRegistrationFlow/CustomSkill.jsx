import React, { useEffect, useState } from 'react'
// import { LEVEL_OPTIONS, createOptionsForReactSelect, experienceLevels } from '../../websiteRegisterForm/developer/developeStepConstant';
import { useFieldArray } from 'react-hook-form';
// import CommonInput from '../../../components/atomic/CommonInput';
import { IoAddCircle, IoTrash } from 'react-icons/io5';
import { Button } from 'react-bootstrap';
import CommonInput from '../../atomic/CommonInput';
import { createOptionsForReactSelect, experienceLevels, LEVEL_OPTIONS } from '../../constant/developerStepConstant';

const CustomSkill = ({
    errors,
  control,
  watch,
  register,
  skillOptions,
}) => {
    const [formattedSkillOptions, setFormattedSkillOptions] = useState([]);
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
  const { fields, remove, append } = useFieldArray({
    control,
    name: "skills",
  });
  const handleAppend = () => {
    const index = watch("skills").findIndex(
      (curElem) => curElem.title === "" || curElem.level === ""
    );
    //if index value is less than 0 (.i.e -1) means no field is empty
    if (index < 0) {
      append({ title: "", level: "",experience:"" });
    }
  };
  return (
    <div>
    {fields?.map((field, idx) => (
      <>
        <div
          key={field.id}
          className="d-md-flex align-items-center gap-2 mt-md-0 mt-4"
        >
          <div className="w-100">
            <CommonInput
              label={"Enter Skill"}
              name={`skills.${idx}.title`}
              type={"select2"}
              control={control}
              rules={{ required: "This field is required" }}
              error={errors?.skills?.[idx]?.title}
              selectOptions={formattedSkillOptions}
              invalidFieldRequired={true}
              placeholder="Select Skill"
            />{" "}
          </div>
          <div className="w-100">
            <CommonInput
              label={"Enter Experience"}
              name={`skills.${idx}.experience`}
              type={"select2"}
              control={control}
              selectOptions={experienceLevels}
              rules={{ required: "This field is required" }}
              error={errors?.experience?.[idx]?.level}
              invalidFieldRequired={true}
              placeholder="Select Experience"
            />{" "}
          </div>
          <div className="w-100">
            <CommonInput
              label={"Enter Level"}
              name={`skills.${idx}.level`}
              type={"select2"}
              control={control}
              rules={{ required: "This field is required" }}
              error={errors?.skills?.[idx]?.level}
              selectOptions={LEVEL_OPTIONS}
              invalidFieldRequired={true}
              placeholder="Select Level"
            />{" "}
          </div>
          {/* <Button
              onClick={handleAppend}
              variant="transparent"
              className="text-green font-24 p-0 shadow-none border-0"
            >
              <IoAddCircle />
            </Button> */}
          {watch("skills")?.length > 1 && (
            <Button
              onClick={() => remove(idx)}
              variant="transparent"
              className="text-danger font-24 p-0 shadow-none border-0"
            >
              <IoTrash />
            </Button>
          )}
        </div>
      </>
    ))}
    <div className='text-end'>
      <Button
        onClick={handleAppend}
        variant="transparent"
        className="arrow-btn font-24 p-0 shadow-none border-0"
      >
        <IoAddCircle />
      </Button>
    </div>
  </div>
  )
}

export default CustomSkill