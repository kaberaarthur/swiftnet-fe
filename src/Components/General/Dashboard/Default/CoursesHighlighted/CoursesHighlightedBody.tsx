import { Href, ImagePath } from "@/Constant";
import { coursesHighlightedBodyData } from "@/Data/General/Dashboard/Default/Default";
import Image from "next/image";
import Link from "next/link";
import { Button } from "reactstrap";

const CoursesHighlightedBody = () => {
  return (
    <>
      {coursesHighlightedBodyData.map((item, i) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image width={63} height={40} src={`${ImagePath}/dashboard1/invest/${item.image}`}alt="avatar"/>
              </div>
              <div className="flex-grow-1">
                <Link href={Href}>
                  <h6 className="f-w-500">{item.course}</h6>
                </Link>
                <span className="font-light f-w-400 f-13">{item.time}</span>
              </div>
            </div>
          </td>
          <td>{item.amount}</td>
          <td>{item.study}</td>
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

export default CoursesHighlightedBody;
