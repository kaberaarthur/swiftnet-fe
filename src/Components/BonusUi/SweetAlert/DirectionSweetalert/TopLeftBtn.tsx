import { TopLeft } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const TopLeftBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      position: "top-start",
      icon: "error",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <Button color="info" className="sweet-17" onClick={displayAlert}>
      {TopLeft}
    </Button>
  );
};

export default TopLeftBtn;
