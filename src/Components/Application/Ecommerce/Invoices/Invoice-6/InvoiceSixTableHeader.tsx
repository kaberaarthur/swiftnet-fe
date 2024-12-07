import { invoiceSixTable } from "@/Data/Application/Ecommerce/Invoice";

const InvoiceSixTableHeader = () => {
  return (
    <>
      {invoiceSixTable.map((data, i) => (
        <td className="item" key={i}>
          <h6 className="p-2 mb-0">{data}</h6>
        </td>
      ))}
    </>
  );
};

export default InvoiceSixTableHeader;
