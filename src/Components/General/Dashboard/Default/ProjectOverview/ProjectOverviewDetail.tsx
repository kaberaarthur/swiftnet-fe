import { Col, Progress, Row } from "reactstrap";
import {overviewData,projectOverviewData} from "@/Data/General/Dashboard/Default/Default";

const ProjectOverviewDetail = () => {
  return (
    <Row className="align-items-center">
      <Col xs="5" className="custom-width">
        {projectOverviewData.map((item, i) => (
          <Progress  color={item.color} value={item.value} key={i} animated className={`progress-striped-${item.color}`} />
        ))}
      </Col>
      <Col xs="7" className="d-sm-none d-md-block">
        <ul className="overview-details">
          {overviewData.map((item, i) => (
            <li className="d-flex align-items-center p-0" key={i}>
              <div className={`circle-dot-${item.color}`}>
                <span />
              </div>
              <h5>
                {item.number}<span className="font-light ms-1">{item.status}</span>
              </h5>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default ProjectOverviewDetail;
