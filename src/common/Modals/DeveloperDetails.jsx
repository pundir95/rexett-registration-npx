import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
// import RexettButton from "../../../components/atomic/RexettButton";
import { useDispatch, useSelector } from "react-redux";
import { HiUpload } from "react-icons/hi";
// import { filePreassignedUrlGenerate, getDeveloperDetails, updateDeveloperCvDetails } from "../../../redux/slices/clientDataSlice";
// import { fetchDeveloperCv } from "../../../redux/slices/developerDataSlice";
import { useTranslation } from "react-i18next";
import RexettButton from "../../atomic/RexettButton";
import { filePreassignedUrlGenerate, getDeveloperDetails, updateDeveloperCvDetails } from "../../Redux/Slices/ClientDataSlice";
import { fetchDeveloperCv } from "../../Redux/Slices/DeveloperDataSlice";

const DeveloperDetails = ({ show, handleClose, name, position, profile ,experience, id,role,isEdited }) => {
    const dispatch = useDispatch();
    const { smallLoader } = useSelector(state => state.clientData)
    const [file, setFile] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const{ t } =  useTranslation() 
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors, isDirty, isValid, isSubmitting },
    } = useForm({});

    useEffect(() => {
        setValue("name", name);
        setValue("professional_title", position);
        setValue("profile_picture", profile);
        setValue("total_experience" , experience)
    }, [name, position ,experience])

    console.log(selectedImage,"selectedImage")

    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log(file,'file')
        setFile(file)
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

   

    const onSubmit = (values) => {
        let fileData = new FormData();
        fileData.append("file",file);
        if(file==null){
            let data = {
                ...values,
                "user_id" : +id
            };
            console.log(data,"data")
            dispatch(updateDeveloperCvDetails(data,role, () => {
                if(role=="developer"){
                    dispatch(fetchDeveloperCv())
                }else{
                    dispatch(getDeveloperDetails(id))

                }
                handleClose()
            }))
        }else{
            dispatch(filePreassignedUrlGenerate(fileData, (url) => {
                let data = {
                    ...values,
                    "profile_picture": url,
                    "user_id" : +id
                };
                console.log(data,"data")
                dispatch(updateDeveloperCvDetails(data,role, () => {
                    if(role=="developer"){
                        dispatch(fetchDeveloperCv())
                    }else{
                        dispatch(getDeveloperDetails(id))
    
                    }
                    handleClose()
                }))
            }));
        }
    }

    return (
        <Modal show={show} onHide={handleClose} centered className="custom-modal" animation>
            <Modal.Header closeButton className="border-0 pb-3">
            </Modal.Header>

            <Modal.Body>
                <h3 className="popup-heading">Developer Section</h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Form.Group className="mb-4">
                        <Form.Label className="font-14">Name</Form.Label>
                        <Form.Control name="name" className="common-field" placeholder="Enter your name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Please Enter Name",
                                },

                            })}

                        ></Form.Control>
                        <p className="error-message">
                            {errors.name?.message}
                        </p>
                        <Form.Label className="font-14">Position</Form.Label>
                        <Form.Control name="professional_title" className="common-field" placeholder="Enter your Position"
                            {...register("professional_title", {
                                required: {
                                    value: true,
                                    message: "Please Enter Position",
                                },


                            })}

                        ></Form.Control>
                        <p className="error-message">
                            {errors.professional_title?.message}
                        </p>
                        <div className="flex-none">
                                    <Form.Label className="common-label">{t("experience")}</Form.Label>
                                    <Form.Select className="filter-select shadow-none"
                                      {...register("total_experience", {
                                        required: {
                                            value: true,
                                            message: "Please Enter Experience",
                                        },
                                    })}
                                    >
                                        <option value="" > {t("selectExperience")} </option>
                                        <option value="1 years" onClick={(e) => e.stopPropagation()}>1 {t("years")}</option>
                                        <option value="2 years" onClick={(e) => e.stopPropagation()}>2 {t("years")}</option>
                                        <option value="3 years" onClick={(e) => e.stopPropagation()}>3 {t("years")}</option>
                                        <option value="5 years" onClick={(e) => e.stopPropagation()}>5 {t("years")}</option>
                                        <option value="above 5" onClick={(e) => e.stopPropagation()}>above 5  {t("years")}</option>
                                    </Form.Select>
                                </div>
                        <p className="error-message">
                            {errors.professional_title?.message}
                        </p>


                        <Form.Label className="font-14">Image</Form.Label>
                        <Form.Control type="file" id="developer-image"
                            name="profile_picture"
                            {...register("profile_picture", {
                                onChange: (e) => handleChange(e),
                                required: {
                                    value: false,
                                    message: "Profile Picture is required",
                                },
                            })}
                            className="d-none" />
                        <Form.Label htmlFor="developer-image" className="upload-image-label d-block"><HiUpload /> Upload Image, Image must be jpg or png</Form.Label>
                        <div>
                            <img src={selectedImage ? selectedImage : profile} alt="Selected" style={{ width: "150px", maxHeight: "150px" }} />
                        </div>


                    </Form.Group>
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
                </form>
            </Modal.Body>
        </Modal>
    )
}
export default DeveloperDetails;