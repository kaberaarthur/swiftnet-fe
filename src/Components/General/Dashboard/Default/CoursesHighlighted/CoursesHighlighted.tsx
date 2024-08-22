import { Card, CardBody, Col, Table } from "reactstrap";
import { CoursesHighlightedHeading, Monthly, Weekly, Yearly } from "@/Constant";
import CoursesHighlightedBody from "./CoursesHighlightedBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const CoursesHighlighted = () => {
  return (
    <Col xl="4" md="6">
      <Card>
        <CardCommonHeader headClass="pb-0" title={CoursesHighlightedHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pt-0 course-table">
            <Table responsive>
              <thead>
                <tr>
                  <th>Course name</th>
                  <th>Price</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <CoursesHighlightedBody />
              </tbody>
            </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CoursesHighlighted;
