import { Card, CardBody, Col, Row } from 'reactstrap'
import { flagIconData } from '@/Data/Icons/FlagIcons'
import { FlagIconType } from '@/Type/Icons/IconsTypes'

const FlagIconCardBody:React.FC<FlagIconType> = ({ getITag }) => {
  return (
    <CardBody>
      <Row className="icon-event iconly-icons icon-lists">
        {flagIconData.map((icon, index) => (
          <Col sm="4" xxl="2" lg="3" key={index} onClick={() => getITag(icon.abbrivation)}>
            <Card className='d-flex align-items-center flex-column default-border'>
              <i className={`flag-icon flag-icon-${icon.abbrivation}`}></i>
              <div className='flex-grow-1'>
                <h6>{`flag-icon flag-icon-${icon.abbrivation}`}</h6>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </CardBody>
  )
}

export default FlagIconCardBody