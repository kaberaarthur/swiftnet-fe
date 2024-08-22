import { useState } from "react";
import { Alert, Button, Card, CardBody, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { AlertsWithIconsTextActions, Check } from "@/Constant";
import { iconTextData } from "@/Data/UiKits/Alert/AlertData";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const AlertsWithIconsAndTextActions = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [visibleAlert, setVisibleAlert] = useState<boolean>(true);
  const [visibleAlertThree, setVisibleAlertThree] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissAlert = () => setVisibleAlert(false);
  const onDismissAlertThree = () => setVisibleAlertThree(false);
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={AlertsWithIconsTextActions} span={iconTextData} headClass="pb-0"/>
        <CardBody className="dark-txt">
          <Alert color="transparent" fade isOpen={visible} className="border-success alert-dismissible p-0" >
            <div className="alert-arrow bg-success">
              <SvgIcon iconId="clock" className="feather" />
            </div>
            <p>Your time Over after <strong className="txt-dark">5</strong> minute</p>
            <Button className="p-0 border-0 me-2 ms-auto" onClick={onDismiss}>
              <span className="bg-success px-3 py-1">{Check}</span>
            </Button>
          </Alert>
          <Alert color="transparent" fade isOpen={visibleAlert} className="border-info alert-dismissible p-0" >
            <div className="alert-arrow bg-info">
              <SvgIcon iconId="heart" className="feather" />
            </div>
            <p>
              Oh snap! Change a few things up
              <strong className="txt-dark"> Notification check</strong>
            </p>
            <Button className="p-0 border-0 me-2 ms-auto" onClick={onDismissAlert}>
              <span className="bg-info px-3 py-1">{'Alert'}</span>
            </Button>
          </Alert>
          <Alert color="transparent" fade isOpen={visibleAlertThree} className="border-warning alert-dismissible p-0" >
            <div className="alert-arrow bg-warning">
              <SvgIcon iconId="youtube" className="feather" />
            </div>
            <p>One of <strong className="font-dark"> YouTube's</strong>most crucial ranking factors is Watch Time.
            </p>
            <Button className="p-0 border-0 me-2 ms-auto" onClick={onDismissAlertThree}>
              <span className="bg-warning px-3 py-1">{'Show'}</span>
            </Button>
          </Alert>
        </CardBody>
      </Card>
    </Col>
  );
};

export default AlertsWithIconsAndTextActions;
