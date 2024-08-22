import { ClickIt } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const ClickItBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      title: "Welcome! to the Edmin theme",
      confirmButtonColor: "var(--theme-default)",
    });
  };

  return (
    <Button color="primary" className="sweet-1" onClick={displayAlert}>
      {ClickIt}
    </Button>
  );
};

export default ClickItBtn;
