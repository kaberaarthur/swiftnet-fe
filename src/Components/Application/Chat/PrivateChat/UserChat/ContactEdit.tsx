import { DropClassTypes } from "@/Type/Application/Chat/ChatType";
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const ContactEdit: React.FC<DropClassTypes> = ({ dropClass }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className={`contact-edit ${dropClass}`}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle color="">
          <i className="fa fa-bars dropdown-toggle"></i>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>View details</DropdownItem>
          <DropdownItem>Send messages</DropdownItem>
          <DropdownItem>Add to favorites</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ContactEdit;
