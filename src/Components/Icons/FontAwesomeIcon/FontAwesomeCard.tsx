import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { IconsCommonProps } from "@/Type/Icons/IconsTypes";

const FontAwesomeCard: React.FC<IconsCommonProps> = ({iconType,title,parentCallback}) => {
  const getITag = (tag: string) => {
    parentCallback(tag);
  };

  return (
    <Card>
      <CardHeader className="pb-0 d-flex justify-content-between align-items-center">
        <h4>{title}</h4>
      </CardHeader>
      <CardBody>
        <Row className="icon-event iconly-icons icon-lists">
          {iconType?.map((item,i)=>(
            <Col xxl="2" lg="3" sm="3" onClick={() => getITag(item)} key={i}>
              <Card className="d-flex align-items-center flex-column default-border">
                <i className={`fa fa-${item}`} ></i>{" "}
                {"fa fa-"}
                {item}
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default FontAwesomeCard;
