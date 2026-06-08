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
            <h3>Error Loading Page</h3>
            <p className="sub-content">{"Sign in again to access this page. A change has been effected by your admin."}</p>
            <Button color={"primary"} href={`/auth/login`}>
              Sign In
            </Button>
          </Col>
        </Container>
      </div>
    </div>
  );
};

export default CommonError;
