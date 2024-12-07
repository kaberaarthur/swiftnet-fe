"use client";
import { Button, Col, Container } from "reactstrap";
import { BackToHomePage, PageNotFound } from "@/Constant";

const CommonError: React.FC<{ errorSvg: JSX.Element }> = ({ errorSvg }) => {
  return (
    <div className="page-wrapper compact-wrapper">
      <div className="error-wrapper">
        <Container>
          <div className="svg-wrraper">{errorSvg}</div>
          <Col md="8" className="offset-md-2">
            <h3>{PageNotFound}</h3>
            <p className="sub-content">{"The page you are attempting to reach is currently not available. This may be because the page does not exist or has been moved."}</p>
            <Button color={"primary"} href={`/dashboard/default`}>
              {BackToHomePage}
            </Button>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default CommonError;
