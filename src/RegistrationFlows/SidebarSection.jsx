import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import rexettLogo from "./../assets/images/rexett-logo-white.png"
import { Link } from "react-router-dom";


const SidebarSection = ({activeStep,stepperSideBarItems,handleSetActiveStep,arrPercentage}) => {
    const {t} = useTranslation();
    
const getPercentage = () => {
  return arrPercentage[activeStep]

};

  return (
    <div className="resume-sidebar">
      <div className="resume-sidelogo mb-4 text-center">
        <Link to={'https://www.rexett.com'}><img src={rexettLogo} /></Link>
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
              <span className="step-label">{t(label)}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-none comp-wrapper">
        <h4 className="resume-sideheading mt-3">Completeness:</h4>
        <div className="resume-progress-wrapper">
          <div className="resume-progressbx">
            <div style={{width: `${getPercentage()}%`}}></div>
          </div>
          <span className="resume-progress-status font-12 fw-medium">{getPercentage()}%</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarSection;