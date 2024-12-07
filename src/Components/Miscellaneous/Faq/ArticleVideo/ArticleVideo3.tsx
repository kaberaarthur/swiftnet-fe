import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { articleDataThird } from "@/Data/Miscellaneous/Faq/Faq";
import { Card, CardBody, Col, Row } from "reactstrap";

const ArticleVideo3 = () => {
  return (
    <Col xl="4">
      <Row>
        {articleDataThird.map((item, i) => (
          <Col xl="12" md="6" key={i}>
            <Card>
              <CardBody>
                <div className="d-flex">
                  <SvgIcon iconId="youtube" className="feather m-r-30 flex-shrink-0" />
                  <div className="flex-grow-1">
                    <h5 className="f-w-500">{item.title}</h5>
                    <p>{item.description}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ArticleVideo3;
