import { Card, CardBody, Col } from "reactstrap";
import { Month, Monthly, ScheduleTimeHeading, Weekly, Year, Yearly } from "@/Constant";
import ScheduleTimeTab from "./ScheduleTimeTab";
import { useState } from "react";
import ScheduleTimeTabContent from "./ScheduleTimeTabContent";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const ScheduleTime = () => {
  const [tabId,setTabId] = useState<string>("mon-tab")
  return (
    <Col xl="3" sm="6">
      <Card className="schedule-card">
        <CardCommonHeader headClass="pb-0" title={ScheduleTimeHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0">
          <div className="d-flex justify-content-between mb-3">
            <h5>Aug 2024</h5>
            <div className="d-flex align-items-center gap-2 monthly-time">
              <h5 className="font-light">{Month} </h5>
              <h5 className="font-light">{Year}</h5>
            </div>
          </div>
          <ScheduleTimeTab setTabId={setTabId} tabId={tabId}/>
          <ScheduleTimeTabContent tabId={tabId}/>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ScheduleTime;
