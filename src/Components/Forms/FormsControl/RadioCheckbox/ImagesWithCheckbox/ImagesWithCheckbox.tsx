import { Card, CardBody, Col, Row } from 'reactstrap'
import { ImagesWithCheckboxs } from '@/Constant'
import CustomImagesWithCheckbox from './CustomImagesWithCheckbox'
import DynamicImagesWithCheckbox from './DynamicImagesWithCheckbox'
import { imageWithCheckboxData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const ImagesWithCheckbox = () => {
  return (
    <Col xs="12">
      <Card>
        <CommonCardHeader title={ImagesWithCheckboxs} span={imageWithCheckboxData} headClass='pb-0' />
        <CardBody className='checkbox-checked'>
          <div className="main-img-checkbox">
            <Row className="g-3">
              <CustomImagesWithCheckbox />
              <DynamicImagesWithCheckbox />
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ImagesWithCheckbox