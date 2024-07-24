import React from "react";
import { Col, Form } from "react-bootstrap";
import { IoIosCamera } from "react-icons/io";
import { IoCameraOutline, IoClose } from "react-icons/io5";
import { IMAGE_ALLOWED_EXTENSIONS } from "../constant/developerStepConstant";
import demoImg from "../assets/images/profile-demo.png"

const CommonProfilePictureSection = ({
  register,
  fieldName,
  previewImage,
  setPreviewImage,
  imageFile,
  setImageFile,
  setValue,
  clearErrors,
  errors,
  setError,
}) => {

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (IMAGE_ALLOWED_EXTENSIONS.includes(file.type)) {
        const url = URL.createObjectURL(file);
        setPreviewImage(url);
        setImageFile(file);
        clearErrors(fieldName);
      } else {
        setValue(fieldName, null);
        setError(fieldName, {
          type: "manual",
          message: "Please enter a valid image i.e png || jpeg || jpg || svg",
        });
        setPreviewImage(null);
      }
    }
  };

  return (
    <>
      <div className="profile-upload-preview position-relative">
        <div className="profile-img-preview w-100 h-100">
          <img src={previewImage ? previewImage : demoImg} />
        </div>
        <Form.Group>
        {/* <Form.Label className="font-14 fw-medium">Resume *</Form.Label> */}
          <Form.Control
            {...register(fieldName, {
              onChange: (e) => handleImageChange(e),
              required:{
                value:true,
                message:"Profile Picture is required"
              }
            })}
            type="file"
            id="logo_file"
            placeholder="Company Name"
            className="common-field d-none"
          />
          
          <Form.Label htmlFor="logo_file" className="profile-img-label">
            <IoCameraOutline />
          </Form.Label>
          {errors[fieldName] && (
            <p className="field-error">{errors[fieldName]?.message}</p>
          )}
        </Form.Group>
              </div>
    
    </>
  );
};

export default CommonProfilePictureSection;
