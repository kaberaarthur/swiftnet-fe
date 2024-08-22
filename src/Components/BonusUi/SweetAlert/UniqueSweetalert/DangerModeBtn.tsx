import SweetAlert from "sweetalert2";
import { DangerMode } from "@/Constant";
import { Button } from "reactstrap";

const DangerModeBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="#">Why do I have this issue?</a>'
    });
  };
  return (
    <Button color="danger" className="sweet-7" onClick={displayAlert}>
      {DangerMode}
    </Button>
  );
};

export default DangerModeBtn;
