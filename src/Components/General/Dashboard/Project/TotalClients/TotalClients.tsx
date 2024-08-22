import { Card, CardBody, Col } from "reactstrap";
import CommonHeaderProject from "../CommonHeaderProject";
import { ImagePath, TotalClientsHeading } from "@/Constant";
import TotalClientsBtn from "./TotalClientsBtn";
import TotalClientsChart from "./TotalClientsChart";
import { totalClientsData } from "@/Data/General/Dashboard/Project/Project";
import Image from "next/image";

const TotalClients = () => {
  return (
    <Col md="4">
      <Card className="client-card">
        <CommonHeaderProject title={TotalClientsHeading} number="7465" />
        <CardBody>
          <div className="d-block">
            <div className="d-flex justify-content-between align-items-center">
              <div className="team-member">
                <div className="customers d-inline-block avatar-group">
                  <ul>
                    {totalClientsData.map((item, i) => (
                      <li className="d-inline-block p-0" key={i}>
                        <Image width={52} height={53} className="img-52 b-r-8" src={`${ImagePath}/user/${item}`} alt="#" />
                      </li>
                    ))}
                    <li className="d-inline-block p-0">
                      <span className="img-52 img-h-52 b-r-10">+4 </span>
                    </li>
                  </ul>
                </div>
              </div>
              <TotalClientsChart />
            </div>
            <TotalClientsBtn />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TotalClients;
