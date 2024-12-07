import Swal from "sweetalert2";
import { Range } from "@/Constant";
import { Button } from "reactstrap";

const RangeBtn = () => {
  const displayAlert = () => {
    Swal.fire({
      title: "How old are you?",
      icon: "question",
      input: "range",
      inputLabel: "Your age",
      inputAttributes: {
        min: "8",
        max: "120",
        step: "1"
      },
      inputValue: 25
    });
  }
  return (
    <Button className="btn-transparent sweet-29" onClick={displayAlert}>
      {Range}
    </Button >
  );
};

export default RangeBtn;
