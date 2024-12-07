import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { HobbiesAndInterest } from '@/Constant'
import { hobbiesAndInterestsData } from '@/Data/Application/SocialApp/SocialApp'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'

const HobbiesAndInterests = () => {
  return (
    <Col sm="12">
      <Card>
        <CardHeader className="social-header">
          <h5>
            <span>{HobbiesAndInterest}</span>
            <span className="pull-right">
              <SvgIcon iconId='more-vertical' className='feather' /></span>
          </h5>
        </CardHeader>
        <CardBody>
          {hobbiesAndInterestsData.map((data, index) => (
            <Row className="details-about" key={index}>
              <Col sm="6">
                <div className="your-details">
                  <span className="f-w-600 mb-2 d-block">{data.heading1}:</span>
                  <p>{data.paragraph1}</p>
                </div>
              </Col>
              <Col sm="6">
                <div className="your-details your-details-xs">
                  <span className="f-w-600 mb-2 d-block">{data.heading2}</span>
                  <p>{data.paragraph2}</p>
                </div>
              </Col>
            </Row>
          ))}
        </CardBody>
      </Card>
    </Col>
  )
}

export default HobbiesAndInterests