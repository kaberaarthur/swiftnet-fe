import { Badge, Card, CardBody, Col } from "reactstrap";
import { Monthly, TotalVisitHeading, Weekly, Yearly} from "@/Constant";
import ReactApexChart from "react-apexcharts";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { totalVisitCardData } from "@/Data/General/Dashboard/Default/Default";
import SVG from "@/CommonComponent/SVG";
import { totalVisitCardChatData } from "@/Data/General/Dashboard/DashboardChartData";

const TotalVisitCard = () => {
  return (
    <Col xl="12" lg="5" xs="6">
      <Card className="visit-card card-hover">
        <CardCommonHeader headClass="pb-0" title={TotalVisitHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="pb-0">
          <ul className="d-flex justify-content-xl-between justify-content-evenly">
            {totalVisitCardData.map((item, i) => (
              <li key={i} className="p-0">
                <Badge color={`light-${item.color}`} className="b-r-0">
                  <SVG iconId={item.svgIcon} className="svg-menu me-1" />
                  {item.title}
                </Badge>
                <div className="d-block text-center mt-2">
                  <h6 className="f-w-500">{item.percentage}</h6>
                  <span className="font-light f-13">{item.amount}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
        <div className="visit-chart" >
          <ReactApexChart options={totalVisitCardChatData} series={totalVisitCardChatData.series} height={80} type={"line"} />
        </div>
      </Card>
    </Col>
  );
};

export default TotalVisitCard;
