import { Button, Card, CardBody, Col, Form, Input, InputGroup, Row } from 'reactstrap'
import { AddonPlaceHolder, ButtonAddon, SubmitButtonAddon, SubmitButtonAddonPlaceHolder } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import { buttonAddonData } from '@/Data/Forms/FormsControl/InputGroup/InputGroup'

const ButtonAddons = () => {
  return (
    <Col md="6">
      <Card>
        <CommonCardHeader title={ButtonAddon} span={buttonAddonData} headClass='pb-0'/>
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form ">
            <Row className="g-3">
            <InputGroup>
              <Button color='primary' outline id="buttonAddon1">{'$ 25'}</Button>
              <Input type="text" id="buttonAddon1"/>
            </InputGroup>
            <InputGroup>
              <Input type="text" placeholder={SubmitButtonAddonPlaceHolder} id="buttonAddon2"/>
              <Button color='primary' outline id="buttonAddon2">{SubmitButtonAddon}</Button>
            </InputGroup>
            <InputGroup>
              <Button color='primary'><span>&#8364; </span></Button>
              <Button color='tertiary'>{'0.0114419'}</Button>
              <Input type="text"/>
            </InputGroup>
            <InputGroup>
              <Input type="text" placeholder={AddonPlaceHolder}/>
              <Button color='tertiary'><span>&#8377;</span></Button>
              <Button color='primary'>{'500'}</Button>  
            </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ButtonAddons