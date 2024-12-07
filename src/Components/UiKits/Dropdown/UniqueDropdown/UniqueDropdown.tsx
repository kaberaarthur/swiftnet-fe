import { useState } from 'react'
import { Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import DropdownForm from './DropdownForm';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { Text, UniqueDropdownHeading } from '@/Constant';
import { uniqueData } from '@/Data/UiKits/Dropdown/Dropdown';

const UniqueDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <Col sm="6">
      <Card>
        <CardHeaderCommon title={UniqueDropdownHeading} span={uniqueData} headClass="pb-0" />
        <CardBody className="rtl-dropdown">
          <div className="common-flex">
            <DropdownForm />
            <Dropdown isOpen={open} toggle={toggle}>
              <DropdownToggle caret color="dark" className="text-white">{Text}</DropdownToggle>
              <DropdownMenu className="p-4 text-muted form-wrapper">
                <p>Some example text that&apos;s free-flowing within the dropdown menu.</p>
                <p className="mb-0">And this is more example text. </p>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default UniqueDropdown