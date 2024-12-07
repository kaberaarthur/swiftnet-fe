import { CommonHeaderProjectPropsType } from "@/Type/General/Dashboard/ProjectType";
import { CardHeader } from "reactstrap";

const CommonHeaderProject: React.FC<CommonHeaderProjectPropsType> = ({ title, number }) => {
  return (
    <CardHeader className="border-dash-bottom">
      <h4>{title}</h4>
      <div className="card-icon">
        <h3 className="f-w-600">{number}</h3>
      </div>
    </CardHeader>
  );
};

export default CommonHeaderProject;
