"use client";
import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFourHeader from "./InvoiceFourHeader";
import InvoiceFourDetail from "./InvoiceFourDetail";
import InvoiceFourTable from "./InvoiceFourTable";
import InvoiceTotal from "./InvoiceTotal";
import InvoiceFiveSign from "../Invoice-5/InvoiceFiveSign";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Invoice, InvoiceFour } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const InvoiceFourContainer = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <Breadcrumbs mainTitle={InvoiceFour} parent={Invoice} />
      <div ref={componentRef}>
        <Container className="invoice-2">
          <Card>
            <CardBody>
              <Table className="table-wrapper theme-scrollbar" responsive borderless>
                <tbody>
                  <tr>
                    <InvoiceFourHeader />
                  </tr>
                  <tr>
                    <InvoiceFourDetail />
                  </tr>
                  <tr>
                    <InvoiceFourTable />
                  </tr>
                  <tr style={{ height: 3, width: "100%", background: "linear-gradient(90deg, #43B9B2 20.61%, #0DA759 103.6%)", display: "block", marginTop: 6 }}></tr>
                  <tr>
                    <InvoiceTotal />
                  </tr>
                </tbody>
                <tbody style={{ display: "flex" , alignItems:"center" , justifyContent: "space-between"}}>
                  <InvoiceFiveSign />
                  <InvoiceButtons handlePrint={handlePrint} />
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default InvoiceFourContainer;
