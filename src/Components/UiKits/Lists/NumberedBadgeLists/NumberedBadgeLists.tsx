import { Badge, Card, CardBody, Col, ListGroup, ListGroupItem} from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { NumberedBadgeList } from '@/Constant'
import { numberBadgeData, numberBadgeDataList } from '@/Data/UiKits/Lists/Lists'

const NumberedBadgeLists = () => {
  return (
    <Col xxl="4" lg="6">
      <Card>
        <CardHeaderCommon title={NumberedBadgeList} span={numberBadgeData} headClass='pb-0' />
        <CardBody>
          <ListGroup numbered className="badge-list">
            <ListGroupItem className="d-flex justify-content-between align-items-start flex-wrap">
              <div>Stella Nowland</div>
              <Badge color="warning" pill className="p-2">Freelance</Badge>
            </ListGroupItem>
            {numberBadgeDataList.map(({ title, color, text }, index) => (
              <ListGroupItem className="d-flex justify-content-between align-items-start flex-wrap" key={index}>
                <div>{title}</div>
                <Badge color={color} pill className="p-2">{text}</Badge>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default NumberedBadgeLists