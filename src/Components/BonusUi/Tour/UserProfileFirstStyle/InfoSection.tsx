import { Col, Row } from 'reactstrap'
import { tourAddressData, tourInfoData } from '../../../../Data/BonusUi/Tour/Tour'
import { Href, WebDesignerTour } from '@/Constant'
import Link from 'next/link'

const InfoSection = () => {
  return (
    <Row className="g-3 step3">
      <Col sm="6" xl="4" className="order-sm-1 order-xl-0">
        <Row className="g-3">
          {tourInfoData.map(({ className, iconClass, text, spanText }, index) => (
            <Col md="6" key={index}>
              <div className={`text-start tour-email ${className}`}>
                <h5 className="tour-mb-space f-w-500"><i className={`fa fa-${iconClass} me-2`}></i>{text}</h5>
                <span>{spanText}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
      <Col sm="12" xl="4" className="order-sm-0 order-xl-1">
        <div className="user-designation tour-email">
          <div className="title">
            <Link target="_blank" href={Href}>{"William C. Jennings"}</Link>
          </div>
          <div className="desc mt-2">{WebDesignerTour}</div>
        </div>
      </Col>
      <Col sm="6" xl="4" className="order-sm-2 order-xl-2">
        <Row className="g-3">
          {tourAddressData.map(({ colClass, iconClass, className, text, spanText }, index) => (
            <Col md="6" className={colClass} key={index}>
              <div className={`text-start ${className} tour-email`}>
                <h5 className="tour-mb-space">
                  <i className={`fa fa-${iconClass} me-2`}></i>{text}
                </h5> 
                <span>{spanText}</span>
              </div>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default InfoSection