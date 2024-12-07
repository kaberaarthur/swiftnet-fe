import { useState } from 'react'
import { ButtonGroup, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import CommonDropDown from '../Common/CommonDropDown';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { BasicDropdowns, Dashboard } from '@/Constant';
import { dropDownData, dropDownList } from '@/Data/UiKits/Dropdown/Dropdown';

const BasicDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={BasicDropdowns} span={dropDownData} headClass='pb-0'/>
        <CardBody>
          <div className="common-flex">
            <ButtonGroup>
              <Dropdown isOpen={open} toggle={toggle}>
                <DropdownToggle caret color="primary">{Dashboard}</DropdownToggle>
                <DropdownMenu className="dropdown-block">
                  <DropdownItem>Project</DropdownItem>
                  <DropdownItem>Ecommerce</DropdownItem>
                  <DropdownItem>Crypto</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
            {dropDownList.map((data, index) => (
              <CommonDropDown item={data} key={index} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicDropdown