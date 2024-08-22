import { ImagePath } from "@/Constant";
import { invoiceTwoDatas } from "@/Data/Application/Ecommerce/Invoice";
import Image from "next/image";

const InvoiceTwoData = () => {
  return (
  <>
    {invoiceTwoDatas.map((data,i)=>(
      <tr className="invoice-dark" style={{ backgroundColor: "rgba(67, 185, 178, 0.1)", boxShadow: "0px 1px 0px 0px rgba(82, 82, 108, 0.15)" }} key={i}>
        <td style={{ padding: "18px 15px", display: "flex", alignItems: "left", gap: 10 }} >
          <span style={{ width: 54, height: 51, backgroundColor: "rgba(67, 185, 178 , 0.1)", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
            <Image width={22} height={29} src={`${ImagePath}/email-template/${data.image}.png`} alt="laptop" style={{ height: 29 }} />
          </span>
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            <li>
              <h4 style={{ fontWeight: 400, margin: "4px 0px", fontSize: 16 }} >
                {data.title}
              </h4>
              <span style={{ opacity: "0.8", fontSize: 14 }}>{data.code}</span>
            </li>
          </ul>
        </td>
        <td style={{ padding: "18px 15px" }}>
          <span style={{fontSize:18}}>{data.quantity}</span>
        </td>
        <td style={{ padding: "18px 15px", width: "12%" }}>
          <span style={{fontSize:18}}>${data.price}</span>
        </td>
        <td style={{ padding: "18px 15px", width: "12%" }}>
          <span style={{fontSize:18}}>{data.unit}</span>
        </td>
        <td style={{ padding: "18px 15px", width: "10%" }}>
          <span style={{fontSize:18}}>{data.vat}</span>
        </td>
        <td style={{ padding: "18px 15px" }}>
          <span style={{fontSize:18}}>${data.total}</span>
        </td>
      </tr>
    ))}
  </>
  );
};

export default InvoiceTwoData;
