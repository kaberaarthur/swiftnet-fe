import { Card, CardBody, Col, Input, Label, Row } from 'reactstrap'
import { ImagePath, VariationRadios } from '@/Constant'
import { variationRadioData, variationRadioDataList } from '@/Data/Forms/FormsControl/MegaOption/MegaOption'
import { VariationRadioProp } from '@/Type/Forms/FormControls/FormsControls'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import Image from 'next/image'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'

const VariationRadio = () => {
  return (
    <Col xs="12">
      <Card>
        <CommonCardHeader title={VariationRadios} span={variationRadioData} headClass='pb-0' />
        <CardBody>
          <Row className="g-3">
            {variationRadioDataList.map(({ colClass, title, child }, index) => (
              <Col xl="4"  className={colClass ? colClass : ""} key={index}>
                <div className="card-wrapper default-border rounded-3 h-100 checkbox-checked">
                  <h6 className="sub-title">{title}</h6>
                  {child.map(({ id, labelText, image, icon, name, defaultChecked, iconColor }:VariationRadioProp) => (
                    <div className="payment-wrapper" key={id}>
                      <div className="payment-first">
                        <Label for={`ptm-${id}`} className="d-block">
                          <Input id={`ptm-${id}`} className="radio radio-primary"  type="radio" name={name} value="option1" defaultChecked={defaultChecked} />{labelText}
                        </Label>
                      </div>
                      {(image || icon) && (
                        <div className="payment-second">
                          {image && <img  className="img-fluid" src={`${ImagePath}/${image}`} alt="ecommerce" />}
                          {icon && <SvgIcon className={`feather stroke-${iconColor}`} iconId={icon} />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default VariationRadio