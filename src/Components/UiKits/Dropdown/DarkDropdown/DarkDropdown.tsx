import { useState } from 'react'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { DarkDropdowns, DarkNight } from '@/Constant';
import { darkData } from '@/Data/UiKits/Dropdown/Dropdown';

const DarkDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={DarkDropdowns} span={darkData} headClass="pb-0" />
        <CardBody className="dropdown-basic m-0 rtl-dropdown">
          <div className="common-flex dark-dropdown">
            <Dropdown isOpen={open} toggle={toggle}>
              <DropdownToggle caret color="dark" className="text-white">{DarkNight}</DropdownToggle>
              <DropdownMenu className="dropdown-menu-dark dropdown-block mt-1">
                <DropdownItem active header>Dark moon</DropdownItem>
                <DropdownItem>Dark owl</DropdownItem>
                <DropdownItem>Nightfall</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DarkDropdown