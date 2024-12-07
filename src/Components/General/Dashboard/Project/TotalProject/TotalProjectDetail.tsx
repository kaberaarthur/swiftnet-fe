import { totalProjectDetailData } from "@/Data/General/Dashboard/Project/Project";
import { Col } from "reactstrap";

const TotalProjectDetail = () => {
  return (
    <Col xs="6">
      <ul className="project-details">
        {totalProjectDetailData.map((data, i) => (
          <li className="d-flex align-items-center mt-3 justify-content-between p-0" key={i}>
            <div className="d-flex align-items-center">
              <div className={`circle-dot-${data.color}`}>
                <span />
              </div>
              <p className="ms-2 f-w-500">{data.title}</p>
            </div>
            <span className="ms-1 f-w-500">{data.count}</span>
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default TotalProjectDetail;
