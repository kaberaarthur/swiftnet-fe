import { Breadcrumb, BreadcrumbItem, Col, Container, Row } from "reactstrap";
import SVG from "../SVG";
import Link from "next/link";
import { PropsTypes } from "@/Type/Layout/Breadcrumbs";

const Breadcrumbs = ({ mainTitle, parent }: PropsTypes) => {

  return (
    <Container fluid>
      <Row className="page-title">
        <Col sm="6">
          <h3>{mainTitle}</h3>
        </Col>
        <Col sm="6">
          <Breadcrumb className="justify-content-sm-end align-items-center">
            <BreadcrumbItem>
              <Link href={`/dashboard/default`}>
                <SVG iconId="Home" className="svg-color" />
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{parent}</BreadcrumbItem>
            <BreadcrumbItem className="active">{mainTitle}</BreadcrumbItem>
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
};

export default Breadcrumbs;
