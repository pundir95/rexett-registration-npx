import React from "react";
import { Button } from "react-bootstrap";
import RexettSpinner from "./RexettSpinner";

const RexettButton = ({ type, text, className, variant, isLoading,onClick , disabled, icon,children }) => {
  return (
    <Button type={type} variant={variant} className={className} onClick={onClick} disabled ={disabled} >
      {isLoading ? <RexettSpinner /> : text} {icon} {children}
    </Button>
  );
};

export default RexettButton;
