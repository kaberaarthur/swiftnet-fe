import { Badge, Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { SecondaryBorderState } from '@/Constant'
import { borderSecondaryData, borderSecondaryDataList } from '@/Data/BonusUi/CreativeCard/CreativeCard'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'

const BorderSecondaryState = () => {
  return (
    <Col xl="4">
      <Card>
        <CardHeaderCommon headClass="b-l-success b-w-3 pb-0" title={SecondaryBorderState} span={borderSecondaryData} />
        <CardBody>
          <ListGroup numbered className="scroll-rtl">
            <ListGroupItem className="d-flex align-items-start flex-wrap">
              <div className="ms-2 me-auto">Stella Nowland</div>
              <Badge color="warning" pill className="p-2">Freelance</Badge>
            </ListGroupItem>
            {borderSecondaryDataList.map(({title,color,tag}, index) => (
              <ListGroupItem className="d-flex align-items-start flex-wrap" key={index}>
                <div className="ms-2 me-auto">{title}</div>
                <Badge color={color} pill className="p-2">{tag}</Badge>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BorderSecondaryState