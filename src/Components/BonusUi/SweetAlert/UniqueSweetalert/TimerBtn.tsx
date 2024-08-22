import { Timer } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2"; 

const TimerBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      timer: 3000,
      showConfirmButton: false,
      title: "Auto close alert!",
      text: "just a wait! I will close in 3 second!",
      confirmButtonColor: "var(--theme-default)",
    });
  };
  return (
    <Button color="primary" className="sweet-14" onClick={displayAlert}>
      {Timer}
    </Button>
  );
};

export default TimerBtn;
