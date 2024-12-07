import SweetAlert from "sweetalert2";
import { Informational } from "@/Constant";
import { Button } from "reactstrap";

const InformationalBtn = () => {
  const displayAlert = () => {
    SweetAlert.fire({
      title: "The Internet?",
      text: "That thing is still around?",
      icon: "question",
    });
  };
  return (
    <Button color="info" className="sweet-4" onClick={displayAlert}>
      {Informational}
    </Button>
  );
};

export default InformationalBtn;
