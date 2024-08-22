import { Href } from "@/Constant";
import React, { useState } from "react";
import { Maximize } from "react-feather";
import { NavLink } from "reactstrap";

const ZoomInOut = () => {
  const [fullScreen, setFullScreen] = useState(false);
  const fullScreenHandler = (isFullScreen: boolean) => {
    setFullScreen(isFullScreen);
    if (isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document?.exitFullscreen();
    }
  };

  return (
    <li>
      <NavLink onClick={() => fullScreenHandler(!fullScreen)} href={Href}>
        <Maximize className="svg-color" />
      </NavLink>
    </li>
  );
};

export default ZoomInOut;
