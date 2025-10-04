import { Container, Row } from "reactstrap";
import { Dashboard, EcommerceDashboard } from "@/Constant";
import TotalSale from "./TotalSale/TotalSale";
import ManageOrder from "./ManageOrder/ManageOrder";
import SalesSummary from "./SalesSummary/SalesSummary";
import SaleProgress from "./SaleProgress/SaleProgress";
import BestSellers from "./BestSellers/BestSellers";
import AddProduct from "./AddProduct/AddProduct";
import SalesByProduct from "./SalesByProduct/SalesByProduct";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import ProductOffer from "../../Common/ProductOffer/ProductOffer";
import MainTraffic from "./MainTraffic/MainTraffic";
import WeeklyTraffic from "./WeeklyTraffic/WeeklyTraffic";

const ContainerEcommerce = () => {
  return (
    <>
      <Breadcrumbs mainTitle={'Welcome'} parent={Dashboard} />
      <Container fluid className="ecommerce-dashboard">
        <Row>
          <TotalSale />
          {/*<ManageOrder />*/}
          {/*<MainTraffic/>*/}
          {/*<WeeklyTraffic/>*/}
          {/*<ProductOffer />
          <SaleProgress />
          <BestSellers />
          <AddProduct />
          <SalesByProduct />*/}
        </Row>
      </Container>
    </>
  );
};

export default ContainerEcommerce;
