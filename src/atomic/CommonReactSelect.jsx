import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import Select from "react-select";
import CloseIcon from "./CloseIcon";
import { convertCountriesForSelect } from "../utils";

const CommonReactSelect = ({
  control,
  name,
  errors,
  options,
  watch,
  required,
  invalidFieldRequired = false,
  label,
  type,
  handleChange = null,
}) => {
  // in required prop a  message should be given eg. Country name is required
  const [formattedOptions, setFormattedOptions] = useState([]);

  useEffect(() => {
    const formattedOptions = convertCountriesForSelect(options, type);
    setFormattedOptions(formattedOptions);
  }, [options]);
  const showCloseIcon = () => {
    if(invalidFieldRequired && errors?.[name]?.message){
      return <CloseIcon/>
    }
  }
  return (
    <Form.Group className="mb-3 position-relative">
      <Form.Label className="common-label font-14 fw-medium">
        {label}
        {required && "*"}
      </Form.Label>
      <div className="position-relative">
        <Controller
          name={name}
          control={control}
          rules={{
            required: {
              value: required ? true : false,
              message: required,
            },
          }}
          render={({ field }) =>
            handleChange ? (
              <>
                <Select
                  className={`common-field font-14 ${
                    invalidFieldRequired &&
                    errors[name]?.message &&
                    "invalid-field"
                  }`}
                  {...field}
                  value={watch(name)}
                  onChange={(selectedOption) => {
                    handleChange(selectedOption, name);
                  }}
                  options={formattedOptions}
                />
                {showCloseIcon()}
              </>
            ) : (
              <>
                <Select
                  className={`common-field 14 ${
                    invalidFieldRequired &&
                    errors[name]?.message &&
                    "invalid-field"
                  }`}
                  {...field}
                  options={formattedOptions}
                />
                {showCloseIcon()}
              </>
            )
          }
        />
      </div>
        {errors[name] && (
          <p
            className={`${
              invalidFieldRequired ? "field-error" : "error-message"
            }`}
          >
            {errors[name]?.message}
          </p>
        )}
    </Form.Group>
  );
};

export default CommonReactSelect;
