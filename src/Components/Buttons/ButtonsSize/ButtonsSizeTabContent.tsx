import { Button, Col, Row, TabContent, TabPane, Tooltip } from "reactstrap";
import { ButtonsStyleType } from "@/Type/Buttons/Buttons";
import { buttonsSizeTabContentData } from "@/Data/Buttons/Buttons";
import { CommonTooltip } from "../CommonTooltip";

const ButtonsSizeTabContent = ({ tabId }: ButtonsStyleType) => {
  return (
    <Col lg="6" sm="12">
      <TabContent activeTab={tabId}>
        {buttonsSizeTabContentData.map((item, i) => (
          <TabPane tabId={item.id} key={i}>
            <Row className="btn-showcase">
              {item.data.map((items, i) => (
                <Col xs="12" sm="6" md="12" className="text-center" key={i}>
                  <CommonTooltip tooltip={items.tooltip} btnId={items.btnId} id={items.id} size={item.class} color={items.color} title={items.title} classname={item.class} />
                </Col>
              ))}
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </Col>
  );
};

export default ButtonsSizeTabContent;
