import { Email, ImagePath, Phone, Website } from "@/Constant";
import Image from "next/image";

const InvoiceRightLogo = () => {
  return (
    <td>
      <Image width={106} height={37} className="img-fluid for-light" src={`${ImagePath}/logo/logo.png`} alt="logo" style={{ height: "50px", marginBottom: 14 }} />
      <Image width={106} height={37} className="img-fluid for-dark" src={`${ImagePath}/logo/dark-logo.png`} alt="logo" style={{ height: "50px", marginBottom: 14 }} />
      <span style={{ display: "block", lineHeight: "1.5", fontSize: 16, fontWeight: 400, opacity: "0.8" }}>2118 Thornridge Cir. Syracuse, Connecticut 35624, United State</span>
      <span style={{ display: "block", lineHeight: "1.5", fontSize: 16, fontWeight: 400, opacity: "0.8" }}>{Phone} : (239) 555-0108</span>
      <span style={{ display: "block", lineHeight: "1.5", fontSize: 16, fontWeight: 400, opacity: "0.8" }}>{Email} : Edmin@themesforest.com</span>
      <span style={{ display: "block", lineHeight: "1.5", fontSize: 16, fontWeight: 400, opacity: "0.8" }}>{Website}: www.Edminthemes.com</span>
    </td>
  );
};

export default InvoiceRightLogo;
