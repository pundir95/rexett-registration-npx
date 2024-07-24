import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
// import { addDeveloperSocialMedia, deleteDeveloperSocialMedia, fetchDeveloperCv, updateDeveloperSocialMedia } from "../../../redux/slices/developerDataSlice";
import { useDispatch, useSelector } from "react-redux";
// import RexettButton from "../../../components/atomic/RexettButton";
import { useTranslation } from "react-i18next";
import RexettButton from "../../atomic/RexettButton";
import { addDeveloperSocialMedia, fetchDeveloperCv } from "../../Redux/Slices/DeveloperDataSlice";
import { getDeveloperDetails } from "../../Redux/Slices/ClientDataSlice";
// import { getDeveloperDetails } from "../../../redux/slices/clientDataSlice";

const socialMediaOptions = [
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "Linkedin" },
  { value: "twitter", label: "Twitter" },
  { value: "github", label: "Github" },
  { value: "instagram", label: "Instagram" },
  { value: "gitlab", label: "Gitlab" },
  { value: "pinterest", label: "Pinterest" }
];

const SocialMediaModal = ({ show, handleClose, data, id ,role }) => {
  const dispatch = useDispatch()
  const [renderModalData, setRenderModalData] = useState(data)
  const { smallLoader, btnLoader } = useSelector(state => state.developerData)
  const { t } = useTranslation()
  const {
    register,
    control,
    setValue,
    watch,
    handleSubmit,
    reset,
    trigger,
    // setError,
    formState: { errors },
  } = useForm();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "test",
  });


  useEffect(() => {
    if (data) {
      data?.forEach((item, index) => {
        append({
          new_id: item.id,
          url: item.url,
          name: item.name,
          slug: item.slug
        });
      });
    }
  }, [renderModalData]);




  const onSubmit = (value) => {
    let { test } = value
    if (role === "developer") {
      let data={
        "social_links": test,
        "user_id" : id
      }
      dispatch(addDeveloperSocialMedia(data, () => {
        dispatch(fetchDeveloperCv())
        handleClose()
      }))
    } else {
      let data={
        "social_links": test,
        "user_id" : id
      }
      dispatch(addDeveloperSocialMedia(data, () => {
        dispatch(getDeveloperDetails(id))
        handleClose()
      }))
    }
  }

  return (
    <>
      <h3 className="popup-heading">{t("addSocialMedia")}</h3>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {fields?.map((row, index) => (
            <div className="experience-container" key={row.id}>
              <Row>
                <Col md="12">
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">{row.slug}</InputGroup.Text>
                    <Form.Control type="text" className="cv-field" placeholder="Enter Url"
                      {...register(`test[${index}].url`, {
                        required: {
                          value: true,
                          message: "Url can't blank",
                        },
                        pattern: {
                          value: /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|github)\.com\/\S*$/,
                          message: "Please enter a valid social media URL",
                        }
                      })}
                    ></Form.Control>
                    {errors && errors.test && errors.test[index] && errors.test[index].url && (
                      <p className="error-message">{errors.test[index].url.message}</p>
                    )}
                  </InputGroup>
                </Col>
              </Row>
            </div>
          ))}
          <div className="text-center">
            {/* <Button variant="transparent" className="main-btn px-4" type="submit">Submit</Button> */}

            <RexettButton
              type="submit"
              text="Update Profile"
              className="main-btn px-4 font-14 fw-semibold"
              variant="transparent"
              disabled={btnLoader}
              isLoading={btnLoader}
            />
          </div>

        </form>
    </>
 
      

  )
}

export default SocialMediaModal;
