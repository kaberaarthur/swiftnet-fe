import React from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import Swal, { SweetAlertResult } from "sweetalert2";
import { MessageTimerHeading } from "@/Constant";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const MessageTimer: React.FC = () => {
  const displayAlert = () => {
    let timerInterval: NodeJS.Timeout;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        timerInterval = setInterval(() => {}, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result: SweetAlertResult) => {
      if (result.dismiss === Swal.DismissReason.timer) {
      }
    });
  };

  return (
    <Col xl="3">
      <Card>
        <CardHeaderCommon headClass="pb-0" title={MessageTimerHeading} />
        <CardBody>
          <div className="common-flex">
            <Button color="tertiary" className="sweet-20" onClick={displayAlert}>
              {MessageTimerHeading}
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default MessageTimer;
