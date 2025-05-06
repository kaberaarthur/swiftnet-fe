import SVG from "@/CommonComponent/SVG";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md="6" className="footer-copyright">
            <p className="mb-0">Copyright {currentYear} © Swiftnet.</p>
          </Col>
          <Col md="6">
            <p className="mb-0 float-end">
              Hand crafted &amp; made with
              <SVG iconId="footer-heart" className="svg-color footer-icon ms-1" />
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
