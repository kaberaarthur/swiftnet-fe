import { Button } from "reactstrap";
import Swal from "sweetalert2";

const ToastAlertBtn = () => {
  const displayAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      timer: 3000,
      timerProgressBar: true,
    });
    Toast.fire("Signed in successfully", "", "success");
  };
  return (
    <Button color="secondary" className="sweet-13" onClick={displayAlert}>
      Toast Alert
    </Button>
  );
};

export default ToastAlertBtn;
