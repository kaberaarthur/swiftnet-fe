import { ImagePath } from "@/Constant";
import Image from "next/image";
import { Table } from "reactstrap";

const InvoiceHeader = () => {
  return (
    <td>
      <Table className="logo-wrappper w-100">
        <tbody>
          <tr>
            <td>
              <Image width={106} height={37} className="for-light" src={`${ImagePath}/logo/logo.png`} alt="logo" />
              <Image width={106} height={37}  className="for-dark" src={`${ImagePath}/logo/dark-logo.png`} alt="logo"/>
              <span style={{ opacity: "0.8", display: "block", marginTop: 10 }} >
                202-555-0258
              </span>
            </td>
            <td className="address" style={{ textAlign: "right", opacity: "0.8", width: "16%"}} >
              <span>1982 Harvest Lane New York, NY12210 United State</span>
            </td>
          </tr>
        </tbody>
      </Table>
    </td>
  );
};

export default InvoiceHeader;
