import Swal from "sweetalert2";
import { Password } from "@/Constant";
import { Button } from "reactstrap";

const PasswordBtn = () => {
  const displayAlert = async () => {
    const { value: password } = await Swal.fire({
      title: "Enter your password",
      input: "password",
      inputLabel: "Password",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
    if (password) {
      Swal.fire(`Entered password: ${password}`);
    }
  }
  return (
    <Button color="danger" className="sweet-24" onClick={displayAlert}>
      {Password}
    </Button>
  );
};

export default PasswordBtn;
