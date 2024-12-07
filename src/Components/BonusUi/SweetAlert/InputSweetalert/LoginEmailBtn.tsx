import { LoginEmail } from "@/Constant";
import { Button } from "reactstrap";
import Swal from 'sweetalert2'

const LoginEmailBtn = () => {
  const displayAlert = async () => {
    const { value: email } = await Swal.fire({
      title: "Input email address",
      input: "email",
      inputLabel: "Your email address",
      inputPlaceholder: "Enter your email address"
    });
    if (email) {
      Swal.fire(`Entered email: ${email}`);
    }
  }
  return (
    <Button color="tertiary" className="sweet-8" onClick={displayAlert}>
      {LoginEmail}
    </Button>
  );
};

export default LoginEmailBtn;
