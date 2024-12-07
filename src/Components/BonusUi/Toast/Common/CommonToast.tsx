import { CommonToastProp } from "@/Type/BonusUi/BonusUiTypes";
import React, { useState } from "react";
import { Bell, Disc } from "react-feather";
import { Button, Toast, ToastBody, ToastHeader } from "reactstrap";

const CommonToast: React.FC<CommonToastProp> = ({ item }) => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Toast isOpen={open}>
      <div className="toast-header">
        {item.bell ? <Bell className={`toast-icons toast-${item.iconColor}`} /> : <Disc className={`toast-icons toast-${item.iconColor}`} />}
        <strong className="me-auto">{item.title}</strong>
        <small className={item.bell ? "" : "text-muted d-sm-block d-none"}>{item.time}</small>
        <Button close className="p-0" onClick={() => setOpen(false)}></Button>
      </div>
      <ToastBody className="toast-dark">{item.bodyText}</ToastBody>
    </Toast>
  );
};

export default CommonToast;
