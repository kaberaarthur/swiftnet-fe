"use client";
import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceBackImage from "./InvoiceBackImage";
import InvoiceContent from "./InvoiceContent";
import InvoiceOrder from "./InvoiceOrder";
import InvoiceSign from "./InvoiceSign";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { Invoice, InvoiceOne } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const InvoiceOneContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Breadcrumbs mainTitle={InvoiceOne} parent={Invoice} />
      <div ref={componentRef}>
        <Container>
          <Card className="invoice-1">
            <CardBody>
              <Table borderless className="table-wrapper">
                <tbody>
                  <tr>
                    <InvoiceHeader />
                  </tr>
                  <tr>
                    <InvoiceBackImage />
                  </tr>
                  <tr>
                    <InvoiceContent />
                  </tr>
                  <tr>
                    <InvoiceOrder />
                  </tr>
                </tbody>
                <tbody style={{ display: "flex" , alignItems:"center" , justifyContent: "space-between"}}>
                  <InvoiceSign />
                  <InvoiceButtons handlePrint={handlePrint}/>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default InvoiceOneContainer;
