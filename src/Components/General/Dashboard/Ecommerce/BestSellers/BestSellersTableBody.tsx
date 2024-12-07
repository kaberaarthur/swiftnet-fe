import { Href, ImagePath } from "@/Constant";
import { bestSellersTableBodyData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import Image from "next/image";
import Link from "next/link";
import { Button } from "reactstrap";

const BestSellersTableBody = () => {
  return (
    <>
      {bestSellersTableBodyData.map((item, i) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image width={38} height={38} className="b-r-10" src={`${ImagePath}/${item.image}`} alt="avatar" />
              </div>
              <div className="flex-grow-1">
                <Link href={Href}>
                  <h6 className="f-w-500">{item.clientName}</h6>
                  <span className="f-w-400 f-13">{item.date}</span>
                </Link>
              </div>
            </div>
          </td>
          <td>{item.price}</td>
          <td>{item.product}</td>
          <td>{item.amount}</td>
          <td>
            <Button color={`light-${item.color}`} className="edge-btn f-12 w-100">
              {item.status}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default BestSellersTableBody;
