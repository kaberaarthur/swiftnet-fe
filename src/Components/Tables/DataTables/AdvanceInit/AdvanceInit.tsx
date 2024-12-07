import { Container, Row } from "reactstrap";
import StockResult from "./StockResult/StockResult";
import RowCreateCallback from "./RowCreateCallback/RowCreateCallback";
import { AdvanceInit, DataTables } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const AdvanceInitContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={AdvanceInit} parent={DataTables} />
      <Container fluid className="basicinit-page">
        <Row>
          <StockResult />
          <RowCreateCallback />
        </Row>
      </Container>
    </>
  );
};

export default AdvanceInitContainer;
