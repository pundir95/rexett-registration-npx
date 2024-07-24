import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import Select from "react-select";
import "react-phone-number-input/style.css";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import CloseIcon from "./CloseIcon";
import DatePicker from "react-date-picker";

const CommonInput = ({
  label,
  name,
  type = "text",
  control,
  rules,
  readOnly = false,
  placeholder = "",
  error,
  autoComplete = "off",
  isPassword = false,
  onTogglePassword,
  icon,
  onChange,
  accept,
  options = [], // For radio inputs or select options
  selectOptions, // For react-select options
  isMulti = false,
  isMinRequired = false,
  isMaxRequired = false,
  invalidFieldRequired = false,
  defaultOption = "",
  rows = null,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  console.log(error,"error")

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (onTogglePassword) {
      onTogglePassword();
    }
  };
  const showCloseIcon = () => {
    if (invalidFieldRequired && error?.message) {
      return <CloseIcon />;
    }
  };
  return (
    <Form.Group className="mb-3">
      <Form.Label className="common-label">{label}</Form.Label>
      <div className="position-relative">
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => {
            if (type === "radio") {
              return options.map((option, index) => (
                <Form.Check
                  {...field}
                  key={index}
                  type="radio"
                  id={`${name}-${index}`}
                  label={option.label}
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              ));
            } else if (type === "phone") {
              return (
                <>
                  <PhoneInput
                    placeholder={placeholder}
                    value={field.value ? String(field.value) : ""}
                    onChange={field.onChange}
                    inputProps={{
                      name: name,
                      readOnly: readOnly,
                      autoComplete: autoComplete,
                      className: `common-field ${
                        invalidFieldRequired &&
                        error?.message &&
                        "invalid-field"
                      }`,
                    }}
                  />
                  {showCloseIcon()}
                </>
              );
            } else if (type === "select2") {
              return (
                <>
                  <Select
                    {...field}
                    options={selectOptions}
                    className={`common-field ${invalidFieldRequired && error?.message && "invalid-field"} `}
                    isDisabled={readOnly}
                    // onChange={(selectedOption) => field.onChange(selectedOption)}
                    // value={selectOptions?.find(
                    //   (option) => option.value === field.value
                    // )}
                    placeholder={placeholder}
                    isMulti={isMulti}
                  />
                  {showCloseIcon()}
                </>
              );
            } else if (type === "select") {
              return (
                <>
                  <Select
                    {...field}
                    options={selectOptions}
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    isDisabled={readOnly}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption)
                    }
                    value={selectOptions?.find(
                      (option) => option.value === field.value
                    )}
                    placeholder={placeholder}
                    isMulti={isMulti}
                  />
                  {showCloseIcon()}
                </>
              );
            } else if (type === "normal-select") {
              return (
                <>
                  <Form.Select
                    {...field}
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                  >
                    <option disabled selected value="">
                      {defaultOption}
                    </option>
                    {options?.map(({ label, value }, idx) => (
                      <option key={idx} value={value}>
                        {label}
                      </option>
                    ))}
                  </Form.Select>
                  {showCloseIcon()}
                </>
              );
            } else if (type === "multi-select") {
              return (
                <>
                  <Select
                    {...field}
                    options={selectOptions}
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    // isDisabled={readOnly}
                    // onChange={(selectedOption) => field.onChange(selectedOption)}
                    // value={selectOptions?.find(option => option.value === field.value)}
                    placeholder={placeholder}
                    isMulti={true}
                  />
                  {showCloseIcon()}
                </>
              );
            } 
            else if (type === "date") {
              return (
                <>
                  <Form.Control
                    {...field}
                    type="date"
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    // if date should not be less than current date
                    min={
                      isMinRequired && new Date().toISOString().split("T")[0]
                    }
                    // if date should not be less than current date
                    max={
                      isMaxRequired && new Date().toISOString().split("T")[0]
                    }
                  />
                  {showCloseIcon()}
                </>
              );

            }
             else if (type === "onlyNumber") {
              return (
                <>
                  <Form.Control
                    {...field}
                    type="text"
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(
                        /[^0-9]/g,
                        ""
                      );
                      field.onChange(numericValue);
                    }}
                  />
                  {showCloseIcon()}
                </>
              );
            } else if (type === "time") {
              return (
                <Form.Control {...field} type="time" className="common-field" />
              );
            } else if (type === "textarea") {
              return (
                <>
                  <Form.Control
                    {...field}
                    as={type}
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    rows={3}
                  />
                  {showCloseIcon()}
                </>
              );
            } else if (type === "year-picker") {
              console.log(field.value, "this is field.value");
              return (
                <DatePicker
                  {...field}
                  selected={field.value && field.value}
                  maxDate={new Date().toISOString().split("T")[0]}
                  maxDetail="decade"
                  onChange={(date) => field.onChange(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select year"
                  className="common-field"
                />
              )
            } else {
              return (
                <>
                  <Form.Control
                    {...field}
                    type={
                      isPassword
                        ? isPasswordVisible
                          ? "text"
                          : "password"
                        : type
                    }
                    className={`common-field ${
                      invalidFieldRequired && error?.message && "invalid-field"
                    }`}
                    // id='developer-image'
                    placeholder={placeholder}
                    readOnly={readOnly}
                    autoComplete={autoComplete}
                    onChange={
                      onChange ? (e) => onChange(e, field) : field.onChange
                    }
                    accept={accept}
                  />
                  {showCloseIcon()}
                </>
              );
            }
          }}
        />
        {isPassword && (
          <span
            className="eye-btn"
            onClick={handleTogglePassword}
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {icon}
          </span>
        )}
      </div>
      {error && (
        <p
          className={`${
            invalidFieldRequired ? "field-error" : "error-message"
          }`}
        >
          {error.message}
        </p>
      )}
    </Form.Group>
  );
};

export default CommonInput;
