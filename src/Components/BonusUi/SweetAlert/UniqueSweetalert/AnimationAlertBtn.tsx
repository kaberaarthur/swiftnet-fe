import { AnimationAlert } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const AnimationAlertBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      title: "Custom animation with Animate.css",
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  };
  return (
    <Button color="warning" className="sweet-6" onClick={displayAlert}>
      {AnimationAlert}
    </Button>
  );
};

export default AnimationAlertBtn;
