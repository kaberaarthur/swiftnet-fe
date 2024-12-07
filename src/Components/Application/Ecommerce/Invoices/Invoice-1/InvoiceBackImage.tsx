import { ImagePath } from "@/Constant";
import Image from "next/image";

const InvoiceBackImage = () => {
  return (
    <td>
      <Image width={1140} height={175} className="banner-image" src={`${ImagePath}/email-template/invoice-1/1.png`} alt="background"/>
    </td>
  );
};

export default InvoiceBackImage;
