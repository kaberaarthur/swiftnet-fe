"use client";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Invoice, InvoiceSix } from "@/Constant";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import InvoiceSixHeader from "./InvoiceSixHeader";
import InvoiceSixPrint from "./InvoiceSixPrint";
import InvoiceSixTable from "./InvoiceSixTable";
import UserDetails from "./UserDetails";

const InvoiceSixContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Breadcrumbs mainTitle={InvoiceSix} parent={Invoice} />
      <div ref={componentRef}>
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <CardBody>
                  <div className="invoice">
                    <div>
                      <InvoiceSixHeader />
                      <hr />
                      <UserDetails />
                      <InvoiceSixTable />
                    </div>
                    <InvoiceSixPrint handlePrint={handlePrint} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default InvoiceSixContainer;
