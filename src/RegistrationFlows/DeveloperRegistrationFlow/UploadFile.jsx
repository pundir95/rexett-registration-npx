import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FaUpload } from "react-icons/fa6";
import { IoClose, IoPlay } from "react-icons/io5";
import videoImg from "../../../assets/img/demo-video.png";
import IntroVideo from "../../../components/common/Modals/IntroVideo";

const UploadFile = ({ label, placeholder,
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
  const [showVideo,setShowVideo]=useState(false)
 const DOC_ALLOWED_EXTENSIONS = [
        "application/pdf",
        "application/msword"

      ];
 const VIDEO_ALLOWED_EXTENSIONS=[
    "video/mp4",
    "video/webm",
    "video/ogg"
 ]     

  
 const handleFileChange = async (e, name) => {
    const file = e.target.files[0];
    const isImage = DOC_ALLOWED_EXTENSIONS.includes(file.type);
    const isVideo = VIDEO_ALLOWED_EXTENSIONS.includes(file.type);

    if (file) {
      if (name === "upload_resume" && isImage) {
        const url = URL.createObjectURL(file);
        setPreviewImage((prev) => ({ ...prev, resume: url }));
        setImageFile((prev) => ({ ...prev, resume: file }));
        clearErrors(fieldName);
      } else if (name=="intro_video" && isVideo) {
        const url = URL.createObjectURL(file);
        setPreviewImage((prev) => ({ ...prev, introVideo: url }));
        setImageFile((prev) => ({ ...prev, introVideo: file }));
        clearErrors(fieldName);
      } else {
        setValue(fieldName, null);
        setError(fieldName, {
          type: "manual",
          message: `Please enter a valid file type: ${name === "upload_resume" ? "pdf,msword" : "mp4, webm, ogg"}`,
        });
        setPreviewImage(null);
      }
    }
  };

console.log(imageFile,"imageFile")
console.log(previewImage,"previewImage")
console.log(fieldName,"fieldName")
console.log(errors,"err")
console.log(showVideo,"showe")

const handleIntroVideo=()=>{
  console.log("int")
  setShowVideo(!showVideo)
}

  return (
    <>
      <div className="mb-3">
        <Form.Label className="font-14 fw-medium">{label} *</Form.Label>

        <Form.Control
            {...register(fieldName, {
              onChange: (e) => handleFileChange(e,fieldName),
            })}
            type="file"
            id={fieldName}
            placeholder="Company Name"
            className="common-field d-none"
          />
        <Form.Label htmlFor={fieldName} className="upload-intro-file">
          {placeholder}
        </Form.Label>
       
      </div>
      <div>
      {errors[fieldName] && (
            <p className="field-error">{errors[fieldName]?.message}</p>
          )}
        {label!=="Resume" ? (
          <div className="profile-upload-preview position-relative preview_intro mb-3">
            <div className="profile-img-preview w-100 h-100">
              {/* <video src={previewImage?.introVideo? previewImage?.introVideo:videoImg} /> */}
            
            </div>
            <div className="playback_intro" onClick={handleIntroVideo}>
              <IoPlay />
            </div>
            <Form.Label htmlFor="intro-video" className="profile-img-label">
              <FaUpload />
            </Form.Label>
  
          </div>
        ) : (
          <div className="d-flex justify-content-between align-items-center gap-5 p-2 bg-light rounded-3 mb-3">
            <span className="font-14 fw-medium">{imageFile?.resume?.name}</span>
            <span className="cursor-pointer text-danger">
              {/* <IoClose /> */}
                {/* {errors[fieldName] && (
            <p className="field-error">{errors[fieldName]?.message}</p>
          )} */}
            </span>
        
          </div>
          
        )}
      </div>
      <IntroVideo show={showVideo} handleClose={handleIntroVideo} previewImage={previewImage?.introVideo}/>
    </>
  );
};

export default UploadFile;
