import { Table } from "reactstrap";
import { AccountNo, Date, DueAmount, InvoiceNo } from "@/Constant";

const InvoiceNumber = () => {
  return (
    <td>
      <Table responsive style={{ width: "100%", borderSpacing: 4, marginBottom: 20 }}>
        <tbody>
          <tr>
            <td style={{ background: "rgba(67, 185, 178 , 0.1)", padding: "15px 25px" }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#43B9B2", opacity: "0.8", margin: 0, lineHeight: 2 }}>{Date} :</p>
              <span style={{ fontSize: 16, fontWeight: 600 }}>10 Mar, 2024</span>
            </td>
            <td style={{ background: "rgba(67, 185, 178 , 0.1)", padding: "15px 25px" }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#43B9B2", opacity: "0.8", margin: 0, lineHeight: 2 }}>{InvoiceNo} :</p>
              <span style={{ fontSize: 16, fontWeight: 600 }}>#VL25000365</span>
            </td>
            <td style={{ background: "rgba(67, 185, 178 , 0.1)", padding: "15px 25px" }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#43B9B2", opacity: "0.8", margin: 0, lineHeight: 2 }}>{AccountNo} :</p>
              <span style={{ fontSize: 16, fontWeight: 600 }}>0981234098765</span>
            </td>
            <td style={{ background: "rgba(67, 185, 178 , 0.1)", padding: "15px 25px" }}>
              <p style={{ fontSize: 16, fontWeight: 500, color: "#43B9B2", opacity: "0.8", margin: 0, lineHeight: 2 }}>{DueAmount} :</p>
              <span style={{ fontSize: 16, fontWeight: 600 }}>$7860.00 </span>
            </td>
          </tr>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceNumber;
