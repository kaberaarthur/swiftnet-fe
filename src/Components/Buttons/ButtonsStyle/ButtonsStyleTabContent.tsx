import { Button, Col, Row, TabContent, TabPane } from "reactstrap";
import { ButtonsStyleType } from "@/Type/Buttons/Buttons";
import { buttonsStyleTabContentData } from "@/Data/Buttons/Buttons";
import { CommonTooltip } from "../CommonTooltip";

const ButtonsStyleTabContent = ({ tabId }: ButtonsStyleType) => {
  return (
    <Col lg="6" sm="12">
      <TabContent activeTab={tabId}>
        {buttonsStyleTabContentData.map((item, i) => (
          <TabPane tabId={item.id} key={i}>
            <Row className="btn-showcase">
              {item.data.map((items, i) => (
                <Col xs="12" sm="6" md="12" key={i} className="text-center">
                  <CommonTooltip tooltip={items.tooltip} id={items.id} outlines={item.outlines} color={items.color} title={items.title} classname={item.class} gradien={item.gradien} />
                </Col>
              ))}
            </Row>
          </TabPane>
        ))}
      </TabContent>
    </Col>
  );
};

export default ButtonsStyleTabContent;
