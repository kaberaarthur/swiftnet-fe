import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { Crypto, Ecommerce, Project, ViewProject } from "@/Constant";
import { useState } from "react";

const ProjectView = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle className="view-btn btn bg-light d-block w-100 position-relative text-center" caret>{ViewProject}</DropdownToggle>
      <DropdownMenu end >
        <DropdownItem>{Project} </DropdownItem>
        <DropdownItem>{Ecommerce}</DropdownItem>
        <DropdownItem>{Crypto} </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProjectView;
