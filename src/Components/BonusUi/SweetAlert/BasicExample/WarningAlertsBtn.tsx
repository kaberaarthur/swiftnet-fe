import { Button } from "reactstrap";
import { WarningAlerts } from "@/Constant";
import SweetAlert from "sweetalert2";

const WarningAlertsBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            SweetAlert.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
  };
  return (
    <Button color="tertiary" className="sweet-5" onClick={displayAlert}>
      {WarningAlerts}
    </Button>
  );
};

export default WarningAlertsBtn;
