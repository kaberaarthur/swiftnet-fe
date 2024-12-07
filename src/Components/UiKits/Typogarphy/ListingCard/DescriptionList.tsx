import { DescriptionLists } from "@/Constant";
import { orderListData } from "@/Data/UiKits/Typogarphy/Typogarphy";
import { Fragment } from "react";
import { Col } from "reactstrap";

const DescriptionList = () => {
  return (
    <Col md="12" xxl="4">
      <div className="card-wrapper rounded-3 bg-light-tertiary h-100">
        <h6 className="sub-title f-w-600">{DescriptionLists}</h6>
        <dl className="mb-0">
          {orderListData.map((item, index) => (
            <Fragment key={index}>
              <dt>{item.dt}</dt>
              <dd>{item.dd}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </Col>
  );
};

export default DescriptionList;
