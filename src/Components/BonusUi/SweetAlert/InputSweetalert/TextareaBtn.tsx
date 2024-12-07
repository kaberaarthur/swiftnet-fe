import Swal from "sweetalert2";
import { Textarea } from "@/Constant";
import { Button } from "reactstrap";

const TextareaBtn = () => {
  const displayAlert = async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });
    if (text) {
      Swal.fire(text);
    }
  }
  return (
    <Button color="warning" className="sweet-25" onClick={displayAlert}>
      {Textarea}
    </Button>
  );
};

export default TextareaBtn;
