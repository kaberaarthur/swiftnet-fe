import { Button, Card, CardBody, Col } from "reactstrap";
import { RTLAlert, RTLSupportHeading } from "@/Constant";
import Swal from "sweetalert2";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const RTLSupport = () => {
  const displayAlert = () => {
    Swal.fire({
      title: "هل تريد الاستمرار؟",
      icon: "question",
      iconHtml: "؟",
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
      showCancelButton: true,
      showCloseButton: true
    });
  }
  return (
    <Col xl="3">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={RTLSupportHeading} />
        <CardBody>
          <div className="common-flex">
            <Button color="secondary" className="sweet-15" onClick={displayAlert}>
              {RTLAlert}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default RTLSupport;
