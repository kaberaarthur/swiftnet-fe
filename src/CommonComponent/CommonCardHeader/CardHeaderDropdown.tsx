import { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { CardHeaderDropDownProps } from "@/Type/Layout/CommonCardHeader";

const CardHeaderDropdown = ({ mainTitle, firstItem, secondItem, thirdItem }: CardHeaderDropDownProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="icon-dropdown">
      <DropdownToggle caret={mainTitle ? true : false} color="" className="dropdown-toggle">
        {mainTitle ? mainTitle : <i className="icon-more-alt" />}
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem>{firstItem} </DropdownItem>
        <DropdownItem>{secondItem}</DropdownItem>
        <DropdownItem>{thirdItem} </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CardHeaderDropdown;
