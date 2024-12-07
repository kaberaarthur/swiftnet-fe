import { Table } from "reactstrap";
import InvoiceRightSide from "./InvoiceRightSide";
import InvoiceAddress from "./InvoiceAddress";
import InvoiceDetail from "./InvoiceDetail";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const InvoiceFiveHeader = () => {
  return (
    <Table responsive style={{ width: "100%" }} borderless>
      <tbody>
        <tr style={{ padding: "28px 0 5px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <td>
            <Image width={106} height={37} className="for-light" src={`${ImagePath}/logo/logo.png`} alt="logo" />
            <Image width={106} height={37} className="for-dark" src={`${ImagePath}/logo/dark-logo.png`} alt="logo" />
          </td>
          <td>
            <InvoiceRightSide />
          </td>
        </tr>
        <tr style={{ display: "flex", justifyContent: "space-between" }}>
          <InvoiceAddress />
          <InvoiceDetail />
        </tr>
      </tbody>
    </Table>
  );
};

export default InvoiceFiveHeader;
