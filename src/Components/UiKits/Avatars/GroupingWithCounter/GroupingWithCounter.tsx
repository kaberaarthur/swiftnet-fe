import { Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import DynamicGroupingWithCounter from "./DynamicGroupingWithCounter";
import { GroupingWithCounterHeading, ImagePath } from "@/Constant";
import { groupingWithCounter, groupingWithCounterData } from "@/Data/UiKits/Avtar/Avtar";
import Image from "next/image";

const GroupingWithCounter = () => {
  return (
    <Col xl="3" md="6">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={GroupingWithCounterHeading} span={groupingWithCounter} />
        <CardBody>
          <div className="avatar-showcase">
            <div className="avatars">
              <div className="customers d-inline-block avatar-group">
                <ul>
                  <li className="d-inline-block">
                    <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/avatar/4.jpg`} alt="#" />
                  </li>
                  {groupingWithCounterData.map((item, i) => (
                    <li className="d-inline-block" key={i}>
                      <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/avatar/${item}.jpg`} alt="#" />
                    </li>
                  ))}
                  <li className="d-inline-block">
                    <span className="b-r-10">+4</span>
                  </li>
                </ul>
              </div>
              <DynamicGroupingWithCounter />
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default GroupingWithCounter;
