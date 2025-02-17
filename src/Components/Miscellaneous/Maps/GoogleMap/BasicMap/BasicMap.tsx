import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Card, CardBody, Col } from "reactstrap";
import { BasicDemoMap } from "@/Constant";
import { basicCenter, basicContainerStyle } from "@/Data/Miscellaneous/Maps/Maps";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const BasicMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0",
  });

  return (
    <Col lg="6" md="12">
      <Card>
        <CardCommonHeader title={BasicDemoMap} borderClass={true} />
        <CardBody>
          <div className="map-js-height ">
            <div id="gmap-simple" className="map-block">
              {isLoaded ? <GoogleMap mapContainerStyle={basicContainerStyle} center={basicCenter} zoom={10} /> : "Loading"}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default BasicMap;
