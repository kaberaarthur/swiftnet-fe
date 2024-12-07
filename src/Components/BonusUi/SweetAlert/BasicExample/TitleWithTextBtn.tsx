import { TitleWithText } from "@/Constant";
import { Button } from "reactstrap";
import SweetAlert from "sweetalert2";

const TitleWithTextBtn = () => {
    const displayAlert = () => {
        SweetAlert.fire({
            title: "It's Magic!",
            text: "Thank you for visiting Edmin theme",
            confirmButtonColor: "var(--theme-default)",
        });
    };
  return (
    <Button color="secondary" className="sweet-2" onClick={displayAlert}>
      {TitleWithText}
    </Button>
  );
};

export default TitleWithTextBtn;
