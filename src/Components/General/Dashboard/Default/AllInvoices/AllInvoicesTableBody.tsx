import { Button, Input, NavLink } from "reactstrap";
import { Href, ImagePath } from "@/Constant";
import { AllInvoicesTableBodyData } from "@/Data/General/Dashboard/Default/Default";
import Image from "next/image";

const AllInvoicesTableBody = () => {
  return (
    <>
      {AllInvoicesTableBodyData.map((item, i) => (
        <tr key={i}>
          <td>
            <Input type="checkbox" />
          </td>
          <td>{item.id}</td>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image width={40} height={42} className="b-r-10 img-40" src={`${ImagePath}/avatar/${item.image}`} alt="avatar" />
              </div>
              <div className="flex-grow-1">
                <NavLink to={Href}>
                  <h6 className="f-w-500">{item.name}</h6>
                </NavLink>
                <span className="font-light f-w-400 f-13">{item.email}</span>
              </div>
            </div>
          </td>
          <td>{item.project}</td>
          <td>{item.date}</td>
          <td>{item.amount}</td>
          <td>
            <Button className={`edge-btn f-13 w-100`} color={`light-${item.color}`}>
              {item.status}
            </Button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AllInvoicesTableBody;
