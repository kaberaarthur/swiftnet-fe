import { Col, Input, Label } from 'reactstrap'
import { imageWithCheckboxDataList } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'
import { ImagePath } from '@/Constant'
import Image from 'next/image'

const DynamicImagesWithCheckbox = () => {
  return (
    <>
      {imageWithCheckboxDataList.map(({ src, label, id, defaultChecked, disabled, alt }, index) => (
        <Col xxl="3" sm="6" key={index}>
          <div className="card-wrapper solid-border rounded-3">
            <h6 className="sub-title fw-bold">{label}</h6>
            <div className="img-checkbox">
              <Input className="main-img-cover" id={id} type="checkbox" name="radio6" defaultChecked={defaultChecked} disabled={disabled} />
              <Label check for={id} className="mb-0">
                <Image width={346} height={220}  src={`${ImagePath}/switch/${src}.jpg`} alt={alt} />
              </Label>
            </div>
          </div>
        </Col>
      ))}
    </>
  )
}

export default DynamicImagesWithCheckbox