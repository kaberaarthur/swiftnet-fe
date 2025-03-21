import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Card, CardBody, Col } from "reactstrap";
import { Polygons } from "@/Constant";
import { polylineCenter, polylineContainerStyle } from "@/Data/Miscellaneous/Maps/Maps";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const PolylineMapComp = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0",
  });

  return (
    <Col lg="6" md="12">
      <Card>
        <CardCommonHeader title={Polygons} />
        <CardBody>
          <div className="map-js-height">
            <div id="gmap-simple" className="map-block">
              {isLoaded ? <GoogleMap mapContainerStyle={polylineContainerStyle} center={polylineCenter} zoom={10}></GoogleMap> : "loading"}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default PolylineMapComp;
