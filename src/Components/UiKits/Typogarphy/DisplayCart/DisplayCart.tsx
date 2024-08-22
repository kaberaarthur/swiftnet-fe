import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { DisplayHeadings } from "@/Constant";
import { displayData } from "@/Data/UiKits/Typogarphy/Typogarphy";

const DisplayCart = () => {
  return (
    <Col xs="12">
      <Card>
        <CardHeaderCommon title={DisplayHeadings} span={displayData} headClass="pb-0" />
        <CardBody className="d-flex flex-column gap-2">
          <h2 className="display-1 m-0">Display 1</h2>
          <h3 className="display-2 m-0">Display 2</h3>
          <h4 className="display-3 m-0">Display 3</h4>
          <h5 className="display-4 m-0">Display 4</h5>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DisplayCart;
