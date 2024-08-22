import { Card, CardBody, Col, Progress, Row } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { MultipleBars } from '@/Constant'
import { multipleDta, multipleList } from '@/Data/UiKits/Progress/Progress'

const MultipleBarsCart = () => {
  return (
    <Col lg="6">
      <Card>
        <CardHeaderCommon title={MultipleBars} span={multipleDta} headClass='pb-0' />
        <CardBody className="progress-showcase">
          <Row>
            <Col>
              <Progress multi>
                <Progress color="primary" bar value="30" />
                <Progress color="secondary" bar value="20" />
                <Progress color="tertiary" bar value="15" />
              </Progress>
              <Progress multi>
                {multipleList.map(({ color, value }, index) => (
                  <Progress color={color} bar value={value} key={index} style={{ width: "10%" }} />
                ))}
              </Progress>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MultipleBarsCart