import { Card, CardBody, Col } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { BorderColor } from '@/Constant'
import { borderColorData, borderColorDetail } from '@/Data/UiKits/HelperClasses/HelperClassesData'

const BorderColorCart = () => {
  return (
    <Col xl="12">
      <Card>
        <CardHeaderCommon title={BorderColor} span={borderColorDetail} headClass='pb-0' />
        <CardBody>
          <div className="gradient-border">
            <div className="helper-common-box">
              <div className="helper-box b-t-primary solid-border fill-wrapper"> </div>.b-t-primary
            </div>
            {borderColorData.map((item, index) => (
              <div className="helper-common-box" key={index}>
                <div className={`helper-box ${item} solid-border fill-wrapper`}> </div>.{item}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BorderColorCart