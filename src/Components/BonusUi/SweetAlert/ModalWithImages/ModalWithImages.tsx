import { Button, Card, CardBody, Col } from "reactstrap";
import { ModalWithImagesHeading } from "@/Constant";
import Swal from "sweetalert2";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const ModalWithImages = () => {
  const displayAlert = () => {
    Swal.fire({
    title: "Sweet!",
    text: "Modal with a custom image.",
    imageUrl: "https://unsplash.it/400/200",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image"
    });
  }
  return (
    <Col xl='3'>
      <Card>
        <CardHeaderCommon headClass="pb-0" title={ModalWithImagesHeading} />
        <CardBody>
          <div className="common-flex">
            <Button color="info" className="sweet-21" onClick={displayAlert} >
              {ModalWithImagesHeading}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ModalWithImages;
