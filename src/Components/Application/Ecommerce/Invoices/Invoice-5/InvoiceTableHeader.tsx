import { Description, No, Quantity, Subtotal, UnitePrice } from "@/Constant";

const InvoiceTableHeader = () => {
  return (
    <tr style={{ background: "#43B9B2" }}>
      <th style={{ padding: "18px 15px", textAlign: "center", position: "relative", borderTopLeftRadius: 10 }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{No}</span>
      </th>
      <th style={{ padding: "18px 16px", textAlign: "left" }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{Description}</span>
      </th>
      <th style={{ padding: "18px 15px", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{UnitePrice}</span>
      </th>
      <th style={{ padding: "18px 15px", textAlign: "center" }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{Quantity}</span>
      </th>
      <th style={{ padding: "18px 15px", textAlign: "center", position: "relative", borderTopRightRadius: 10 }}>
        <span style={{ color: "#fff", fontSize: 16, fontWeight: 600 }}>{Subtotal}</span>
      </th>
    </tr>
  );
};

export default InvoiceTableHeader;
