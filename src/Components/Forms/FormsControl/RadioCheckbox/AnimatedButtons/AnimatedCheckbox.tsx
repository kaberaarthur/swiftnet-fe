import { Fragment } from 'react'
import { Col, Input, Label } from 'reactstrap'
import { InstagramAnimated, WhatIsYourFavoriteSocialMedia } from '@/Constant'
import { animatedSocialData } from '@/Data/Forms/FormsControl/RadioCheckbox/RadioCheckbox'

const AnimatedCheckbox = () => {
  return (
    <Col sm="6">
      <div className="card-wrapper solid-border rounded-3">
        <h6 className="sub-title f-w-500">{WhatIsYourFavoriteSocialMedia}</h6>
        <Label className="d-block" for='chk-ani_2' check>
          <Input className="checkbox-primary" id="chk-ani_2" type="checkbox" />
          {InstagramAnimated}
        </Label>
        {animatedSocialData.map(({ id, text, defaultChecked,color }, index) => (
          <Fragment key={index}>
            <Label className="d-block" for={id} check>
              <Input className={`checkbox-${color}`} id={id} type="checkbox" defaultChecked={defaultChecked} />{text}
            </Label>
          </Fragment>
        ))}
      </div>
    </Col>
  )
}

export default AnimatedCheckbox