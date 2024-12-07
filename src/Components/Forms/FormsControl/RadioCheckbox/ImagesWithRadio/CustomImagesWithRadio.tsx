import { Col, Input, Label } from 'reactstrap'
import { Custom, ImagePath } from '@/Constant'
import Image from 'next/image'

const CustomImagesWithRadio = () => {
  return (
    <Col xxl="3" sm="6">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title fw-bold">{Custom}</h6>
        <div className="img-checkbox">
          <Input className="main-img-cover" id="img-radio-1" type="radio" name="radio6"/>
          <Label check for='img-radio-1' className="mb-0">
            <Image width={346} height={220}  src={`${ImagePath}/switch/5.jpg`} alt="coffee-beans" />
          </Label>
        </div>
      </div>
    </Col>
  )
}

export default CustomImagesWithRadio