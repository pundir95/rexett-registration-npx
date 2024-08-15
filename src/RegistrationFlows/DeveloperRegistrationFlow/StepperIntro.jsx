import React from 'react';
import { useTranslation } from 'react-i18next';
import { getStepperIntroData } from '../../helper/RegisterConstant';

const StepperIntro = ({ activeStep, nestedActiveStep }) => {
  const { t } = useTranslation();
  let introData = getStepperIntroData(activeStep);

  return (
    <div>
      <h3 className="font-18 fw-semibold text-white">{t(introData?.heading)}</h3>
      <h2 className="resume-heading">
        {t(introData?.mainHead)}
      </h2>
      <p className="fw-semibold text-offwhite">{t(introData?.heading1)}</p>
      <p className="mb-1 text-offwhite">{t(introData?.para)}</p>
    </div>
  );
}

export default StepperIntro;
