import { UnOrderList } from "@/Constant";
import { unOrderData } from "@/Data/UiKits/Typogarphy/Typogarphy";
import { Col } from "reactstrap";

const UnOrderLists = () => {
  return (
    <Col md="6" xxl="4">
      <div className="card-wrapper h-100 bg-light-primary rounded-3">
        <h6 className="sub-title f-w-600">{UnOrderList}</h6>
        <ul >
          <li>{"One who looks on the bright side of things"}</li>
          {unOrderData.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Col>
  );
};

export default UnOrderLists;
