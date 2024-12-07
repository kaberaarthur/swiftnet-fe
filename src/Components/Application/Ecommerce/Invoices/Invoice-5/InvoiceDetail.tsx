import { BankTransfer, BankAccount, Code, InvoiceHeading } from "@/Constant";

const InvoiceDetail = () => {
  return (
    <td>
      <h4 style={{ fontSize: 42, fontWeight: 600, color: "#43B9B2", margin: "0 0 12px 0" }}>{InvoiceHeading}</h4>
      <span style={{ fontSize: 16, color: "#43B9B2", display: "block", fontWeight: 600, marginBottom: 20 }}>{BankTransfer}</span>
      <span style={{ color: "#43B9B2", display: "block", marginBottom: 12, fontWeight: 600 }}>Leslie Alexander</span>
      <span style={{ display: "block", fontSize: 16, marginBottom: 12 }}>{BankAccount} : 0981234098765</span>
      <span style={{ display: "block", fontSize: 16, marginBottom: 12 }}>{Code} : LEF098756</span>
    </td>
  );
};

export default InvoiceDetail;
