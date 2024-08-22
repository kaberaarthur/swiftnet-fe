import { Card, CardBody, Col } from "reactstrap";
import { MapContainer, TileLayer } from "react-leaflet";
import { LeafletWorldMap } from "@/Constant";
import { usaPosition } from "@/Data/Miscellaneous/Maps/Maps";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const WorldMap = () => {
  return (
    <Col sm="6">
      <Card>
        <CardCommonHeader title={LeafletWorldMap} borderClass={true} />
        <CardBody>
          <MapContainer style={{ height: 389 }} easeLinearity={0.35} attributionControl={true} center={usaPosition} zoom={13} scrollWheelZoom={true} className="z-0 jvector-map-height">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </MapContainer>
        </CardBody>
      </Card>
    </Col>
  );
};

export default WorldMap;
