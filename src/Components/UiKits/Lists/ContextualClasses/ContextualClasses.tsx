import { Card, CardBody, Col, ListGroup, ListGroupItem } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ContextualClassesHeading} from "@/Constant";
import { contextualData, contextualDataList } from "@/Data/UiKits/Lists/Lists";

const ContextualClasses = () => {
  return (
    <Col xxl="6">
      <Card className="height-equal">
        <CardHeaderCommon title={ContextualClassesHeading} span={contextualData} headClass="pb-0" />
        <CardBody>
          <ListGroup>
            <ListGroupItem color="primary" className=" list-group-item-action">
              This is Primary bg you can use
              <em className="txt-primary fw-bold"> .list-group-item-primary </em> class.
            </ListGroupItem>
            {contextualDataList.map((item, index) => (
              <ListGroupItem color={item} className={` list-group-item-action`} key={index}>
                This is <span className="text-capitalize">{item}</span> bg you can use
                <em className={`txt-${item} fw-bold`}> .list-group-item-{item}</em> class.
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ContextualClasses;
