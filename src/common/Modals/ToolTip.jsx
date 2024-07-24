import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ToolTip({ text, children }) {
  const toolText = <Tooltip id="tooltip">{text}</Tooltip>;
  return (
    <div>
      <OverlayTrigger placement="bottom" overlay={toolText}>
        <span>{children}</span>
      </OverlayTrigger>
    </div>
  );
}

export default ToolTip;
