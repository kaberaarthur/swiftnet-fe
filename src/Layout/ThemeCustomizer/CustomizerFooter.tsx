import React from "react";
import { BuyNow, Document } from "@/Constant";
import { Button } from "reactstrap";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import SVG from "@/CommonComponent/SVG";

const CustomizerFooter = () => {
  return (
    <div className="customizer-footer">
      <div className="d-flex align-items-center justify-content-around">
        <Button color="primary" href="https://themeforest.net/user/pixelstrap/portfolio" target="_blank">
          <SvgIcon className="stroke-white feather me-1" iconId="shopping-cart" />
          {BuyNow}
        </Button>
        <Button color="primary" href="https://docs.pixelstrap.net/next/edmin/document/" target="_blank">
          <SVG className="stroke-white svg-w-21 me-1" iconId="Document" />
          {Document}
        </Button>
      </div>
    </div>
  );
};

export default CustomizerFooter;
