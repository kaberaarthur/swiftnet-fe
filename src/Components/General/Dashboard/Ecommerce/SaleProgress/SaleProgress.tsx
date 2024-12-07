import { Badge, Card, CardBody, Col, Progress } from "reactstrap";
import { ImagePath, SaleProgressHeading } from "@/Constant";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";
import { saleProgressData } from "@/Data/General/Dashboard/Ecommerce/Ecommerce";
import SVG from "@/CommonComponent/SVG";
import Image from "next/image";

const SaleProgress = () => {
  return (
    <Col md="6" xl="3">
      <Card className="sale-progress">
        <CardCommonHeader headClass="pb-0" title={SaleProgressHeading} />
        <CardBody>
          <ul>
            {saleProgressData.map((item, i) => (
              <li className={`d-flex gap-3 bg-light-${item.color}`} key={i}>
                <div className={`flex-shrink-0 border-${item.color}`}>
                  <Image width={22} height={22} src={`${ImagePath}/dashboard2/product/${item.image}`} alt="product" />
                </div>
                <div className="flex-grow-1">
                  <h5>{item.title}</h5>
                  <span>{item.offers}</span>
                  <Progress color={item.color} value={item.value} animated className={`progress-striped-${item.color}`} />
                </div>
                <Badge color={`light-${item.color}`} className="f-14 b-r-0">
                  <SVG iconId={item.icon} className={`svg-w-20 stroke-${item.color}`} />
                  <span className="f-w-500">{item.percentage}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </Col>
  );
};

export default SaleProgress;
