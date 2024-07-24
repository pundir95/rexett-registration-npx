import moment from "moment";
import React, { Fragment } from "react";

const SingleExperienceCard = ({
  experienceData,
  companyName,
  totalExperience,
}) => {
  const formatDate = (date, format = "MMM YYYY") => {
    const formattedDate = moment(date).format(format);
    return formattedDate;
  };
  return (
    <div className = {`${experienceData?.is_edited && "resume-edit"}`}>
      <h5>{companyName}</h5>
      <p>{totalExperience}</p>
      <div>
        {experienceData?.length > 0 &&
          experienceData.map(
            (
              {
                job_title,
                description,
                start_date,
                end_date,
                is_still_working,
              },
              index
            ) => (
              <div className="sub-exp" key={index}>
                <h4 className="role-text">{job_title} </h4>
                <p className="exp-date">
                  {formatDate(start_date)} -{" "}
                  {is_still_working === true ? "Present" : formatDate(end_date)}
                </p>
                {/* <p className="loc-text">SAS Nagar, Punjab, India</p> */}
                <p className="exp-desc">{description}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default SingleExperienceCard;
