import { addProjectsAndUploadData } from "@/Data/Application/Users/UsersProfile/UsersProfile";
import { Delete, Edit, Href, Update } from "@/Constant";
import Link from "next/link";
import { Button } from "reactstrap";

const AddProjectsAndUploadTableBody = () => {
  return (
    <tbody>
      {addProjectsAndUploadData.map((data, index) => (
        <tr key={index}>
          <td>
            <Link className="text-inherit" href={Href}>
              {"Untrammelled Prevents"}
            </Link>
          </td>
          <td>{data.date}</td>
          <td>
            <span className={`status-icon ${data.statusClass}`} /> {data.status}
          </td>
          <td>{data.price}</td>
          <td className="text-end">
            <Button size="sm" color="primary" href={Href}>
              <i className="fa fa-pencil" /> {Edit}
            </Button>
            <Button size="sm" color="transparent" href={Href}>
              <i className="fa fa-link" /> {Update}
            </Button>
            <Button size="sm" color="danger" href={Href}>
              <i className="fa fa-trash" /> {Delete}
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default AddProjectsAndUploadTableBody;
