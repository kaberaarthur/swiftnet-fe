import { useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, Col, Dropdown, DropdownToggle } from 'reactstrap';
import SplitButtonDropdown from './SplitButtonDropdown';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { Href, SplitDropdowns, Widgets } from '@/Constant';
import { splitData, splitList } from '@/Data/UiKits/Dropdown/Dropdown';
import Link from 'next/link';

const SplitDropdown = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <Col sm="12" xl="12">
      <Card>
        <CardHeaderCommon title={SplitDropdowns} span={splitData} headClass='pb-0'/>
        <CardBody className="dropdown-basic m-0">
          <div className="common-flex">
            <ButtonGroup>
              <Button color="primary" outline>{Widgets}</Button>
              <Dropdown className="separated-btn" isOpen={open} toggle={toggle}>
                <DropdownToggle color="primary">
                  <i className="icofont icofont-arrow-down"></i>
                </DropdownToggle>
                <div className="dropdown-content">
                  <Link href={Href}>General</Link>
                  <Link href={Href}>Chart</Link>
                </div>
              </Dropdown>
            </ButtonGroup>
            {splitList.map((data, index) => (
              <SplitButtonDropdown key={index} item={data} />
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default SplitDropdown