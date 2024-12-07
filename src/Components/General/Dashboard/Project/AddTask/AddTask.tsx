import { Button, Card, CardBody, CardHeader, Col } from "reactstrap";
import DesignMeeting from "./DesignMeeting";
import Calendar from "./Calendar";
import { AddTaskHeading, Href, Today } from "@/Constant";
import Link from "next/link";

const AddTask = () => {
  return (
    <Col lg="12" xl="4">
      <Card className="calendar-box">
        <CardHeader className="border-dash-bottom">
          <h4>{Today}</h4>
          <span>UI/UX designer</span>
          <div className="card-icon">
            <Link href={"/app/calendar"}>
            <Button color="primary" href={Href}>{AddTaskHeading}</Button>
            </Link>
          </div>
        </CardHeader>
        <CardBody>
          <Calendar />
          <DesignMeeting />
        </CardBody>
      </Card>
    </Col>
  );
};

export default AddTask;
