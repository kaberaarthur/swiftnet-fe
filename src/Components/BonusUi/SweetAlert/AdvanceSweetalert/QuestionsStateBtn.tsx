import { QuestionsState } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const QuestionsStateBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
            SweetAlert.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            SweetAlert.fire("Changes are not saved", "", "info");
        }
      });
  };
  return (
    <Button color="warning" className="sweet-12" onClick={displayAlert}>
      {QuestionsState}
    </Button>
  );
};

export default QuestionsStateBtn;
