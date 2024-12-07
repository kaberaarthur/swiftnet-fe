import { Card, CardBody, Col, ListGroup, ListGroupItem } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { ListsWithNumber } from "@/Constant";
import { listNumberData, listNumberDataList } from "@/Data/UiKits/Lists/Lists";

const ListsWithNumbers = () => {
  return (
    <Col md="4">
      <Card>
        <CardHeaderCommon title={ListsWithNumber} span={listNumberData} headClass="pb-0" />
        <CardBody>
          <ListGroup numbered>
            <ListGroupItem className=" font-primary f-w-500">Known for delivery of useful and usable solutions</ListGroupItem>
            {listNumberDataList.map(({ color, text }, index) => (
              <ListGroupItem className={` font-${color} f-w-500`} key={index}>
                {text}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ListsWithNumbers;
