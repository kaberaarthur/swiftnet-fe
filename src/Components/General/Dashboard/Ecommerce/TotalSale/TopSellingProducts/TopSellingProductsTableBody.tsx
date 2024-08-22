import { Button, Input } from "reactstrap";
import { Href, ImagePath } from "@/Constant";
import { topSellingProductsTableData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import { topDownloadersData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import Image from "next/image";
import Link from "next/link";

const TopSellingProductsTableBody = () => {
  return (
    <>
      {topDownloadersData.map((item, i) => (
        <tr key={i}>
          <td>
            <p>{item.id}</p>
          </td>
          <td>
            <h6 className="f-w-500">{item.macaddress}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.uploadSpeed}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.downloadSpeed}</h6>
          </td>
          <td>
            <h6 className="f-w-500">{item.downloadSpeed}</h6>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TopSellingProductsTableBody;
