import { Button, Card, CardBody, Col, Form, Input, InputGroup, Row } from 'reactstrap'
import { Danger, Info, Primary, SegmentedButton,  SegmentedButtonSecondary } from '@/Constant'
import ButtonDropdownList from '../ButtonsWithDropdowns/ButtonDropdownList'
import { buttonWithDropForth, buttonWithDropOne, buttonWithDropThird, buttonWithDropTwo, segmentButtonData } from '@/Data/Forms/FormsControl/InputGroup/InputGroup'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const SegmentedButtons = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={SegmentedButton} span={segmentButtonData} />
        <CardBody className="card-wrapper input-group-wrapper">
          <Form className="theme-form ">
            <Row className="g-3">
            <InputGroup>
              <Button outline color="primary">{Primary} </Button>
              <ButtonDropdownList color="primary" outline={true} divider={true} options={buttonWithDropOne}/>
              <Input type="text" />
            </InputGroup>
            <InputGroup>
              <Input type="text" />
              <Button outline color="secondary">{SegmentedButtonSecondary}</Button>
              <ButtonDropdownList color="secondary" outline={true} divider={true} options={buttonWithDropTwo}/>
            </InputGroup>
            <InputGroup>
              <Button outline color="danger">{Danger} </Button>
              <ButtonDropdownList color="danger" divider={true} options={buttonWithDropThird} />
              <Input type="text" />
            </InputGroup>
            <InputGroup>
              <Input type="text" />
              <Button outline color="info">{Info} </Button>
              <ButtonDropdownList color="info" divider={true} options={buttonWithDropForth} />
            </InputGroup>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Col>
  )
}

export default SegmentedButtons