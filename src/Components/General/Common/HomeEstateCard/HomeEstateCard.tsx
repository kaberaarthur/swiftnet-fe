import { Card, CardBody, Col, Progress } from "reactstrap";
import HomeEstateAvatars from "./HomeEstateAvatars";
import { homeEstateData } from "@/Data/General/Dashboard/Project/Project";
import SVG from "@/CommonComponent/SVG";
import { ProgressName } from "@/Constant";

const HomeEstateCard = () => {
  return (
    <>
      {homeEstateData.map((data, i) => (
        <Col xl="12" key={i}>
          <Card className="esatae-card card-hover">
            <CardBody>
              <div className="esatae-body d-flex align-items-center gap-4">
                <div className="d-flex gap-3 align-items-center">
                  <div className={`flex-shrink-0 bg-${data.color}`}>
                    <SVG iconId={data.icon} className="svg-w-24" />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="f-w-500">{data.title}</h6>
                    <span className="f-w-400 f-13">{data.course}</span>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex">
                    <h6 className="f-w-500">{ProgressName} </h6>
                    <span className="f-w-500 f-14">{data.percentage}</span>
                  </div>
                  <Progress animated striped className={`mt-2 progress-striped-${data.color}`} color={data.color} value={data.value} />
                </div>
                <HomeEstateAvatars data={data} />
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default HomeEstateCard;
