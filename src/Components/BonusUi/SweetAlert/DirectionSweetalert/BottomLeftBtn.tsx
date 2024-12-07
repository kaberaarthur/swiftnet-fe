import { BottomLeft } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const BottomLeftBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      position: "bottom-start",
      icon: "info",
      title: "You can use, Alerts and other HTML tags",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Button color="secondary" className="sweet-18" onClick={displayAlert}>
      {BottomLeft}
    </Button>
  );
};

export default BottomLeftBtn;
