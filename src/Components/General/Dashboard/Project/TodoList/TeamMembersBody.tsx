import { Href, ImagePath } from "@/Constant";
import { teamMembersBodyData } from "@/Data/General/Dashboard/Project/Project";
import Image from "next/image";
import Link from "next/link";
import ReactApexChart from "react-apexcharts";

const TeamMembersBody = () => {
  return (
    <>
      {teamMembersBodyData.map((data, i) => (
        <tr key={i}>
          <td>
            <div className="d-flex align-items-center gap-2">
              <div className="flex-shrink-0">
                <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/avatar/${data.image}`} alt="avatar" />
              </div>
              <div className="flex-grow-1">
                <Link href={Href}>
                  <h6 className="f-w-500">{data.clientName}</h6>
                  <span className="font-light f-w-400 f-13">
                    {data.email}
                  </span>
                </Link>
              </div>
            </div>
          </td>
          <td>{data.designation}</td>
          <td>{data.task}</td>
          <td>
            <div className="team-chart">
              <ReactApexChart options={data.chart} series={data.chart.series} height={80} width={100} type="line" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TeamMembersBody;
