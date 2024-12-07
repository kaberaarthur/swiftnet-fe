import Swal from "sweetalert2";
import { CheckboxInput } from "@/Constant";
import { Button } from "reactstrap";

const CheckboxInputBtn = () => {
  const displayAlert = async () => {
    const { value: accept } = await Swal.fire({
      title: "Terms and conditions",
      input: "checkbox",
      inputValue: 1,
      inputPlaceholder: `
        I agree with the terms and conditions
      `,
      confirmButtonText: `
        Continue&nbsp;<i class="fa fa-arrow-right"></i>
      `,
      inputValidator: (result) => {
        return !result && "You need to agree with T&C";
      }
    });
    if (accept) {
      Swal.fire("You agreed with T&C :)");
    }
  }
  return (
    <Button color="dark" className="sweet-28" onClick={displayAlert}>
      {CheckboxInput}
    </Button>
  );
};

export default CheckboxInputBtn;
