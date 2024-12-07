import { useState } from 'react'
import { ButtonGroup, Card, CardBody, Col, Dropdown, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupText } from 'reactstrap';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { Inputs, WithInputTypes } from '@/Constant';
import { withInputData } from '@/Data/UiKits/Dropdown/Dropdown';

const WithInputType = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);
  return (
    <Col xl="4" sm="6">
      <Card className="height-equal">
        <CardHeaderCommon title={WithInputTypes} span={withInputData} headClass='pb-0' />
        <CardBody className="rtl-dropdown">
          <div className="common-flex">
            <ButtonGroup>
              <Dropdown isOpen={open} toggle={toggle}>
                <DropdownToggle caret color="warning" className="text-white">{Inputs}</DropdownToggle>
                <DropdownMenu className="dropdown-block dropdown-wrapper dark-input-type">
                  <li>
                    <InputGroup className="rounded-0 border-0 shadow-none">
                      <InputGroupText className='ps-0'>
                        <Input className="mt-0 me-2" type="checkbox" value="" />
                        <span>Default checkbox</span>
                      </InputGroupText>
                    </InputGroup>
                    <InputGroup className="rounded-0 border-0 shadow-none">
                      <InputGroupText className='ps-0'>
                        <Input className="mt-0 me-2" type="radio" value="" />
                        <span>Default radio</span>
                      </InputGroupText>
                    </InputGroup>
                  </li>
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default WithInputType