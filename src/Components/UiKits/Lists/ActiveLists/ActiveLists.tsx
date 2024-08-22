import { Card, CardBody, Col, ListGroup, ListGroupItem } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ActiveList } from "@/Constant";
import { activeData, activeListData } from "@/Data/UiKits/Lists/Lists";
import SVG from "@/CommonComponent/SVG";

const ActiveLists = () => {
  return (
    <Col lg="4">
      <Card>
        <CardHeaderCommon title={ActiveList} span={activeData} headClass="pb-0" />
        <CardBody>
          <ListGroup>
            <ListGroupItem active className="bg-warning-light ">
              <SVG className="svg-w-18 stroke-light me-1 stroke-white" iconId="right-3" /> UI Kits
            </ListGroupItem>
            {activeListData.map((item, index) => (
              <ListGroupItem key={index}>
                <SVG className="svg-w-18 stroke-light me-1" iconId="right-3" />
                {item}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ActiveLists;
