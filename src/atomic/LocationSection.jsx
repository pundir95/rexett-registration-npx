import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CommonReactSelect from "./CommonReactSelect";
import { getCitiesList, getStatesList, getTimeZoneForCountry } from "../Redux/Slices/ClientDataSlice";
import CommonInput from "./CommonInput";

const LocationSection = ({
  isVendorStep1=false,
  setValue,
  watch,
  errors,
  control,
  clearErrors,
  isTimeZoneRequired = false,
  isRegistrationStep = false,
  countryCode
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { countriesList, statesList, citiesList, timeZones } = useSelector(
    (state) => state.clientData
  );
useEffect(() => {
  if (watch("country_code")) {
      const countryCode = watch("country_code").value; // Assuming watch("country_code") returns an object with a 'value' property
      dispatch(getStatesList(countryCode));
      dispatch(getTimeZoneForCountry(countryCode));
  } else if (countryCode) {
      dispatch(getStatesList(countryCode));
      dispatch(getTimeZoneForCountry(countryCode));
  }
}, [countryCode, watch]);

  const handleDropDownChange = (value, name) => {
    if (name === "country_code") {
      setValue("country_code", value);
      clearErrors("country_code");
      dispatch(getStatesList(watch("country_code")?.value));
      dispatch(getTimeZoneForCountry(watch("country_code")?.value));
      setValue("time_zone", null);
      setValue("state_iso_code", null);
      // setValue("city", null);
    } else if (name === "state_iso_code") {
      setValue("state_iso_code", value);
      clearErrors("state_iso_code");
      // timezone logic
      // setValue("timezone", value);
      setValue("timezone", value);
      dispatch(
        getCitiesList(
          watch("country_code")?.value,
          watch("state_iso_code")?.label
        )
      );
      setValue("city", null);
    } else if (name === "time_zone") {
      setValue("time_zone", value);
      clearErrors("time_zone");
    }
  };
  return (
    <>
      {isRegistrationStep ? (
        <>
          <Col md={4} className="pe-md-3 pe-0">
            <div className="mb-3">
              <CommonReactSelect
                name="country_code"
                errors={errors}
                invalidFieldRequired={true}
                handleChange={handleDropDownChange}
                watch={watch}
                control={control}
                required="Country is required"
                label="Country"
                type="country"
                options={countriesList}
              />
            </div>
          </Col>
          <Col md={4} className="pe-md-3 pe-0">
            <div className="mb-3">
              <CommonReactSelect
                name="state_iso_code"
                errors={errors}
                invalidFieldRequired={true}
                handleChange={handleDropDownChange}
                watch={watch}
                control={control}
                required="State is required"
                label="State"
                type="state"
                options={statesList}
              />
            </div>
          </Col>
          <Col md={4} className="pe-md-3 pe-0">
            <div className="mb-3">
              <CommonReactSelect
                name="city"
                invalidFieldRequired={true}
                errors={errors}
                handleChange={handleDropDownChange}
                control={control}
                // required="City is required"
                label="City"
                type="city"
                watch={watch}
                options={citiesList}
              />
            </div>
          </Col>
          <Col md={4} className="pe-md-3 pe-0">
            <div className="mb-3">
              <CommonInput
                label={t(`pincode`) + ` *`}
                name={"passcode"}
                // name={isVendorStep1 ? "passcode" : "post_code"}
                invalidFieldRequired={true}
                control={control}
                rules={{ required: "Pin code is required" }}
                error={errors?.["passcode"]}
                type={"onlyNumber"}
                placeholder={"e.g. 143001"}
              />
            </div>
          </Col>
          <Col md={8} className="pe-md-3 pe-0">
            <CommonReactSelect
              name="time_zone"
              errors={errors}
              invalidFieldRequired={true}
              handleChange={handleDropDownChange}
              control={control}
              // required="City is required"
              label="Timezone"
              type="timezones"
              required="Timezone is required"
              watch={watch}
              options={timeZones}
            />
          </Col>
        </>
      ) : (
        <>
          <CommonReactSelect
            name="country_code"
            errors={errors}
            handleChange={handleDropDownChange}
            watch={watch}
            control={control}
            required="Country is required"
            label="Country"
            type="country"
            options={countriesList}
            invalidFieldRequired={true}
          />

          <CommonReactSelect
            name="state_iso_code"
            errors={errors}
            handleChange={handleDropDownChange}
            watch={watch}
            control={control}
            required="State is required"
            label="State"
            type="state"
            options={statesList}
            invalidFieldRequired={true}
          />
          <CommonReactSelect
            name="city"
            errors={errors}
            handleChange={handleDropDownChange}
            control={control}
            // required="City is required"
            label="City"
            type="city"
            watch={watch}
            options={citiesList}
            invalidFieldRequired={true}
          />
          {/* may be need to verify name of timezone value */}
          {isTimeZoneRequired && (
            <CommonReactSelect
              name="time_zone"
              errors={errors}
              handleChange={handleDropDownChange}
              control={control}
              // required="City is required"
              label="Timezone"
              type="timezones"
              required="Timezone is required"
              invalidFieldRequired={true}
              watch={watch}
              options={timeZones}
            />
          )}
        </>
      )}
    </>
  );
};

export default LocationSection;
