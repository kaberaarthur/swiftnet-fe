import { TopRight } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const TopRightBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      position: "top-right",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  };
  return (
    <Button color="primary" className="sweet-16" onClick={displayAlert}>
      {TopRight}
    </Button>
  );
};

export default TopRightBtn;
