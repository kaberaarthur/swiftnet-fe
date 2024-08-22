import { Table } from "reactstrap";
import { ShippingRate, Subtotal, TotalAmount, Vat } from "@/Constant";

const InvoiceTwoTotal = () => {
  return (
    <td>
      <Table borderless responsive>
        <tfoot>
          <tr>
            <td style={{ padding: "5px 24px 5px 0", paddingTop: 15, textAlign: "start" , width: "170px"}}>
              <span style={{ fontSize: 16, fontWeight: 400 }}>{Subtotal} :</span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 15 }}>
              <span style={{ fontSize: 16 }}>$26,400.00</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "5px 24px 5px 0", textAlign: "start" }}>
              <span style={{ fontSize: 16, fontWeight: 400 }}>{Vat} (0%) :</span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 0 }}>
              <span style={{ fontSize: 16 }}>$0.00</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "5px 24px 5px 0", textAlign: "start" }}>
              <span style={{ fontSize: 16, fontWeight: 400 }}> {ShippingRate} : </span>
            </td>
            <td style={{ padding: "5px 0", textAlign: "left", paddingTop: 0 }}>
              <span style={{ fontSize: 16 }}>$10.00</span>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "12px 24px 0px 0px" }}>
              <span style={{ fontWeight: 600, fontSize: 20, color: "#43B9B2" }}>{TotalAmount} :</span>
            </td>
            <td style={{ padding: "12px 24px 0px 0px", textAlign: "start" }}>
              <span style={{ fontWeight: 500, fontSize: 20, color: "rgba(67, 185, 178, 1)" }}>$26,410.00</span>
            </td>
          </tr>
        </tfoot>
      </Table>
    </td>
  );
};

export default InvoiceTwoTotal;
