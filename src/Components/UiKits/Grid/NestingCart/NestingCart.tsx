import { Card, CardBody, Col, Row } from 'reactstrap'
import NestingCardBody from './NestingCardBody'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Nesting } from '@/Constant'
import { nestingData } from '@/Data/UiKits/Grid/GridData'

const NestingCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={Nesting} span={nestingData} headClass='pb-0' />
        <CardBody className="grid-showcase">
          <Row className="g-3">
            <NestingCardBody />
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default NestingCart