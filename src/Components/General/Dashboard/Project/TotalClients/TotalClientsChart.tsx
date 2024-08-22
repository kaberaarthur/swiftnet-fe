import { totalClientChartData } from "@/Data/General/Dashboard/DashboardChartData";
import ReactApexChart from "react-apexcharts";

const TotalClientsChart = () => {
  return (
    <div className="project-chart">
      <ReactApexChart className="project" options={totalClientChartData} series={totalClientChartData.series} height={66} width={180} type="bar" />
    </div>
  );
};

export default TotalClientsChart;
