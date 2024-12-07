import ReactApexChart from "react-apexcharts";
import { Hours } from "@/Constant";
import { taskSummaryChartData } from "@/Data/General/Dashboard/DashboardChartData";

const TaskSummaryRightHours = () => {
  return (
    <div className="d-flex bg-light">
      <div className="flex-grow-1">
        <h6 className="f-16 font-light">{Hours}</h6>
        <h4>67</h4>
      </div>
      <div className="team-chart" id="team-chart" >
        <ReactApexChart options={taskSummaryChartData} series={taskSummaryChartData.series} height={70} type={"line"} />
      </div>
    </div>
  );
};

export default TaskSummaryRightHours;
