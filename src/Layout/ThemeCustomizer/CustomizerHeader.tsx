import { CustomizerHeaderProps } from "@/Type/Layout/Sidebar";
import { PreviewSettings } from "@/Constant";
import { Button } from "reactstrap";

const CustomizerHeader: React.FC<CustomizerHeaderProps> = ({ setOpen }) => {
  return (
    <div className="customizer-header">
      <div className="theme-title">
        <div>
          <h4>{PreviewSettings}</h4>
          <p className="mb-0">
            Try It Real Time
            <i className="fa fa-thumbs-up ms-1" />
          </p>
        </div>
        <div className="flex-grow-1">
          <Button color="light" outline className="icon-btn button-effect pull-right cog-close" onClick={() => setOpen(false)}>
            <i className="fa fa-times" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizerHeader;
