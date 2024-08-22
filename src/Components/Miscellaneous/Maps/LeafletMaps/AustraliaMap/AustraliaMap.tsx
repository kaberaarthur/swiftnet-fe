import { Card, CardBody, Col } from "reactstrap";
import { LeafletAustraliaMap } from "@/Constant";
import { MapContainer, TileLayer } from "react-leaflet";
import { australiaMapPosition } from "@/Data/Miscellaneous/Maps/Maps";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const AustraliaMap = () => {
  return (
    <Col sm="6">
      <Card>
        <CardCommonHeader title={LeafletAustraliaMap} borderClass={true} />
        <CardBody>
          <MapContainer className="jvector-map-height z-0" style={{ height: 389 }} zoom={4} center={australiaMapPosition} zoomControl={true} doubleClickZoom={true} scrollWheelZoom={false} dragging={true}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AustraliaMap;
