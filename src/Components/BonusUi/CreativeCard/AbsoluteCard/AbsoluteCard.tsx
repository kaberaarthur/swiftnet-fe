import { ImagePath } from '@/Constant'
import { cardAbsoluteData } from '@/Data/BonusUi/CreativeCard/CreativeCard'
import Image from 'next/image'
import { Card, CardBody, CardHeader, Col } from 'reactstrap'

const AbsoluteCard = () => {
  return (
    <>
      {cardAbsoluteData.map(({ className, src, span,title }, index) => (
        <Col xl="6" key={index}>
          <Card className="card-absolute">
            <CardHeader className={className}>
              <h5 className='txt-light'>{title}</h5>
            </CardHeader>
            <CardBody>
              <div className="d-flex list-behavior-1 align-items-center">
                <div className="flex-shrink-0">
                  <Image width={134} height={86} className="tab-img img-fluid" src={`${ImagePath}/${src}`} alt="home" />
                </div>
                <div className="flex-grow-1">
                  <p className="mb-xl-0 mb-sm-4">{span}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default AbsoluteCard