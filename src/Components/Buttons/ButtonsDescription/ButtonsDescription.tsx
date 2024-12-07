import { Card, CardBody, Col, Row } from "reactstrap";
import { ButtonsDescriptionHeading } from "@/Constant";
import { buttonsDescriptionData } from "@/Data/Buttons/Buttons";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const ButtonsDescription = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={ButtonsDescriptionHeading} />
        <CardBody>
          <Row>
            <Col sm="12">
                {buttonsDescriptionData.map((data,i)=>(
                    <p className="mb-1" key={i}>
                        <span>
                        Use <code>{data.code}</code> {data.text} <code>{data.code1}</code> {data.text1}
                        </span>
                    </p>
                ))}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ButtonsDescription;
