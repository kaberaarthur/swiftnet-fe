import { ImagePath } from "@/Constant";
import Image from "next/image";

const InvoiceFiveSign = () => {
  return (
    <tr style={{marginTop:36}} >
      <td>
        <Image width={154} height={49} src={`${ImagePath}/email-template/invoice-3/sign.png`} alt="sign" />
        <span style={{ color: "#43B9B2", display: "block", fontSize: 18, fontWeight: 600 }} >
          Laurine T. Ebbert
        </span>
        <span style={{ display: "block", fontSize: 14, paddingTop: 5 }}>
          ( Designer )
        </span>
      </td>
    </tr>
  );
};

export default InvoiceFiveSign;
