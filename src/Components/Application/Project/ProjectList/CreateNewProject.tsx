import { Col } from "reactstrap";
import { CreateNewProjects } from "@/Constant";
import Link from "next/link";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const CreateNewProject = () => {
  return (
    <Col md="6" className="d-md-block">
      <Link className="btn btn-primary" href={`/project/createnew`}>
        <SvgIcon className="feather" iconId="plus-square" />
        {CreateNewProjects}
      </Link>
    </Col>
  );
};

export default CreateNewProject;
