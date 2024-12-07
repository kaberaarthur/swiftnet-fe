import { Badge, Card, CardBody, CardHeader, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { totalSalesData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import SVG from "@/CommonComponent/SVG";

const NewOrders = () => {
  return (
    <>
      {totalSalesData.map((item, i) => (
        <Col md="3" key={i}>
          <Card className="progress-items">
            <CardHeader className="pb-0">
              <div className="d-flex justify-content-between">
                <div>
                  <div className="d-flex gap-2">
                    <h5 className="f-18 font-light">{item.title}</h5>
                  </div>
                  <h3 className="f-26 f-w-600 mt-3">{item.amount}</h3>
                </div>
                <div className={`flex-shrink-0 bg-light-${item.btnColor}`}>
                  <SVG className={`fill-${item.btnColor}`} iconId={item.icon}/>
                </div>
              </div>
            </CardHeader>
            <CardBody className="progress-card pt-0">
              <div>
                <p className="f-w-500">{item.details}</p>
              </div>
              <div className="order-chart">
                <div className="chart">
                  <ReactApexChart options={item.chart} series={item.chart.series} height={120} width={180} type="line" />
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default NewOrders;
