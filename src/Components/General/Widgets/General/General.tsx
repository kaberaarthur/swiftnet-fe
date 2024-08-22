import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { General, Widgets } from "@/Constant";
import { Container, Row } from "reactstrap";
import TotalSale from "./TotalSale/TotalSale";
import ProductOffer from "../../Common/ProductOffer/ProductOffer";
import ScheduleTime from "../../Common/ScheduleTime/ScheduleTime";
import SalesSummary from "./SalesSummary/SalesSummary";
import TotalInvestment from "./TotalInvestment/TotalInvestment";
import TaskSummary from "../../Common/TaskSummary/TaskSummary";
import HomeEstate from "./HomeEstate/HomeEstate";


const ContainerGeneral = () => {
  return (
    <>
      <Breadcrumbs mainTitle={General} parent={Widgets} />
      <Container fluid className="general-widget">
        <Row>
          <TotalSale />
          <ProductOffer/>
          <ScheduleTime/>
          <SalesSummary />
          <TotalInvestment />
          <TaskSummary/>
          <HomeEstate/>
        </Row>
      </Container>
    </>
  );
};

export default ContainerGeneral;
