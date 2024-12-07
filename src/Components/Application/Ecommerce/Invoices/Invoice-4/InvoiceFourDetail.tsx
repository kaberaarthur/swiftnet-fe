import { Table } from "reactstrap";
import { invoiceFourDetail } from "@/Data/Application/Ecommerce/Invoice";

const InvoiceFourDetail = () => {
  return (
    <td>
      <Table responsive borderless style={{ width: "100%", borderSpacing: 4, marginBottom: 20 }}>
        <tbody>
          <tr>
            {invoiceFourDetail.map((data, i) => (
              <td style={{ background: "rgba(67, 185, 178 , 0.1)", padding: "15px 25px" }} key={i}>
                <p style={{ fontSize: 16, fontWeight: 500, color: "#43B9B2", opacity: "0.8", margin: 0, lineHeight: 2 }}>{data.title} :</p>
                <span style={{ fontSize: 18, fontWeight: 600 }}>{data.value}</span>
              </td>
            ))}
          </tr>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceFourDetail;
