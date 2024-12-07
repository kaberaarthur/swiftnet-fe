import React from "react";
import { Card, CardBody, CardFooter, CardHeader, Col } from "reactstrap";
import { EdminTheme } from "@/Constant";
import { CommonCardProp } from "@/Type/BonusUi/BonusUiTypes";

const CommonCard: React.FC<CommonCardProp> = ({ data }) => {
  return (
    <Col xl="4">
      <Card>
        <CardHeader className={data.headerClass}>
          <h4 className={data.headingClass}>{data.title}</h4>
        </CardHeader>
        <CardBody className={data.bodyClass}>
          <h5 className={data.bodyText}>{data.text}</h5>
          <p className="mb-0">{data.span}</p>
        </CardBody>
        <CardFooter className={data.footerClass}>
          <h6 className={data.footerText}>{EdminTheme}</h6>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default CommonCard;
