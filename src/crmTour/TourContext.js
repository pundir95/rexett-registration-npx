// TourContext.js
import React, { createContext, useContext, useState } from 'react';
import { useTour } from '@reactour/tour';

const TourContext = createContext();

export const useTourContext = () => useContext(TourContext);

export const TourProviderWrapper = ({ children }) => {
  const { setIsOpen, setSteps } = useTour();

  const startTour = (steps) => {
    setSteps(steps);
    setIsOpen(true);
  };

  const closeTour = () => {
    console.log("hello")
    setIsOpen(false);
  };

  return (
    <TourContext.Provider value={{ startTour, closeTour }}>
      {children}
    </TourContext.Provider>
  );
};
