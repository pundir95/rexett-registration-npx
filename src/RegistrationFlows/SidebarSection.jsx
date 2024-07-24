import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import rexettLogo from "./../assets/images/rexett-logo-white.png"


const SidebarSection = ({activeStep,stepperSideBarItems,handleSetActiveStep}) => {
    const {t} = useTranslation();
    let arrPercentage=[0,40,20,20,20]
    
const getPercentage = (currentStep) => {
  let result = 0;
  for (let i = 0; i < currentStep-1; i++) {
      result = arrPercentage[i] + arrPercentage[i + 1];
  }
  return result;
};

  return (
    <div className="resume-sidebar">
      <div className="resume-sidelogo mb-4">
        <img src={rexettLogo} />
      </div>
      <div>
        <ul>
          {stepperSideBarItems?.map(({stepNumber,label},index) => (
            <li key={index} className={stepNumber<activeStep && "active-step"} onClick={()=>{handleSetActiveStep(stepNumber)}}>
              <span className="resume-count">
                <span className="resume-step">{stepNumber}</span>
                <span className="resume-check">
                  <FaCheck />
                </span>
              </span>
              <span>{t(label)}</span>
            </li>
          ))}
        </ul>
      </div>
      <h4 className="resume-sideheading mt-3">Completeness:</h4>
      <div className="resume-progress-wrapper">
        <div className="resume-progressbx">
          <div></div>
        </div>
        <span className="resume-progress-status font-12 fw-medium">{getPercentage(activeStep)}%</span>
      </div>
    </div>
  );
};

export default SidebarSection;