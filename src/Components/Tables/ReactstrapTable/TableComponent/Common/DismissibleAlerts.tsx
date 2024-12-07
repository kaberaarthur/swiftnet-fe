import { useState } from "react";
import { Alert } from "reactstrap";

const DismissibleAlerts = () => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  return (
    <Alert color="secondary" isOpen={visible} toggle={onDismiss} fade>
      <p>
        <strong>Holy !</strong> You can check in on some of those fields below.{" "}
      </p>
    </Alert>
  );
};

export default DismissibleAlerts;
