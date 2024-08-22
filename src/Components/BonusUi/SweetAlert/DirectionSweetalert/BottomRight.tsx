import { BottomRightBtn } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const BottomRight = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      position: "bottom-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  };
  return (
    <Button color="tertiary" className="sweet-19" onClick={displayAlert}>
      {BottomRightBtn}
    </Button>
  );
};

export default BottomRight;
