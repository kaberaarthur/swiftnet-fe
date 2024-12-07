import { URL } from "@/Constant";
import { Button } from "reactstrap";
import Swal from 'sweetalert2'

const URLBtn = () => {
  const displayAlert = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL"
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  }
  return (
    <Button color="info" className="sweet-23" onClick={displayAlert}>
      {URL}
    </Button>
  );
};

export default URLBtn;
