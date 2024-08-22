import { Card, CardBody, Col, Row } from 'reactstrap'
import ScrollBar from 'react-perfect-scrollbar'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { HorizontalScrollbars, ImagePath } from '@/Constant'
import { horizontalScrollData, horizontalScrollDataList } from '@/Data/BonusUi/Scrollable/Scrollable'
import Image from 'next/image'

const HorizontalScrollbar = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={HorizontalScrollbars} span={horizontalScrollData} headClass='pb-0' />
        <CardBody>
          <ScrollBar className="scroll-demo horizontal-scroll" style={{ width: "100%", height: "300px" }}>
            <div className="horz-scroll-content scroll-content-width">
              <Row>
                <Col sm="2">
                  <div className="horizontal-img">
                    <Image width={240} height={360}  className="img-fluid" src={`${ImagePath}/scrollbar/fashion1.jpg`} alt="girl" />
                  </div>
                </Col>
                {horizontalScrollDataList.map((src, index) => (
                  <Col sm="2" key={index}>
                    <div className="horizontal-img">
                      <Image width={240} height={360} className="img-fluid" src={`${ImagePath}/${src}`} alt="girl" />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </ScrollBar>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HorizontalScrollbar