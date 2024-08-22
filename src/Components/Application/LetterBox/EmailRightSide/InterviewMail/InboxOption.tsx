import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { MailPropsType } from "@/Type/Application/LetterBox/LetterBox";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const InboxOption:React.FC<MailPropsType> = ({handlePrint}) => {
  const [fill,setFill] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="inbox-options">
      <span>Friday 07 Apr (4 hours ago)</span>
      <div className="light-square" onClick={() => setFill(!fill)}>
        <SvgIcon className={`feather important-mail ${fill ? "active" : ""}`} iconId="star" />
      </div>
      <div className="light-square" onClick={handlePrint}>
        <SvgIcon iconId="printer" className="feather"  />
      </div>
      <div className="light-square btn-group">
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="">
            <SvgIcon className="feather" iconId="menu" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-block">
            <DropdownItem>
              <i className="fa fa-mail-reply" />
              Reply
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-mail-forward" />
              Forward
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

export default InboxOption;
