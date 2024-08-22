import { Email, InvoiceTo, Phone, Website } from "@/Constant";

const InvoiceAddress = () => {
  return (
    <td>
      <span style={{ fontSize: 16, display: "block", fontWeight: 600, color: "#43B9B2", marginBottom: 14 }}>{InvoiceTo} :</span>
      <span style={{ fontSize: 16, display: "block", fontWeight: 600, color: "#43B9B2", marginBottom: 8 }}>Brooklyn Simmons</span>
      <span style={{ fontSize: 16, display: "block", opacity: "0.8", marginBottom: 8, width: "72%", lineHeight: "1.4" }}>2972 Westheimer Rd. Santa Ana, Illinois 85486</span>
      <span style={{ fontSize: 16, display: "block", opacity: "0.8", marginBottom: 8 }}>{Phone} : (219) 555-0114</span>
      <span style={{ fontSize: 16, display: "block", opacity: "0.8", marginBottom: 8 }}>{Email} : yourmail@themesforest.com</span>
      <span style={{ fontSize: 16, display: "block", opacity: "0.8", marginBottom: 8 }}>{Website}: www.websites.com</span>
    </td>
  );
};

export default InvoiceAddress;
