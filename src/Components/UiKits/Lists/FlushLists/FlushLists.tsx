import { Card, CardBody, Col, ListGroup, ListGroupItem } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { FlushList } from "@/Constant";
import { flushData, flushListData } from "@/Data/UiKits/Lists/Lists";
import SVG from "@/CommonComponent/SVG";

const FlushLists = () => {
  return (
    <Col lg="4">
      <Card>
        <CardHeaderCommon title={FlushList} span={flushData} headClass="pb-0" />
        <CardBody>
          <ListGroup flush>
            <ListGroupItem>
              <SVG className="svg-w-18 stroke-light me-1" iconId="right-3" /> PRODUCT
            </ListGroupItem>
            {flushListData.map((item, index) => (
              <ListGroupItem key={index}>
                <SVG className="svg-w-18 stroke-light me-1" iconId="right-3" /> {item}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default FlushLists;
