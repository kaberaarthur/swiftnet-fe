import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
import { Storage } from "@/Constant";
import { Button, Progress } from "reactstrap";

const StoragePlan = () => {
  return (
    <ul>
      <li>
        <Button outline color="primary">
          <SvgIcon iconId="database" className="feather" />
          {Storage}
        </Button>
      </li>
      <li>
        <div className="m-t-15">
          <Progress color="primary" style={{ height: "8px" }} value={25} className="mb-3" />
          <h6 className="f-w-500">{"25 GB of 100 GB used"}</h6>
        </div>
      </li>
    </ul>
  );
};

export default StoragePlan;
