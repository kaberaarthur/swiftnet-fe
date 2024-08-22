import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { HorizontalList } from '@/Constant'
import { horizontalData, horizontalDataList, horizontalListData } from '@/Data/UiKits/Lists/Lists'

const HorizontalLists = () => {
  return (
    <Col xxl="6">
      <Card>
        <CardHeaderCommon title={HorizontalList} span={horizontalData} headClass='pb-0' />
        <CardBody>
          <div className="horizontal-list-wrapper dark-list">
            <ListGroup horizontal="sm" className="fw-bold  pb-2">
              <ListGroupItem className="b-l-primary">Product</ListGroupItem>
              {horizontalDataList.map((item, index) => (
                <ListGroupItem key={index}>{item}</ListGroupItem>
              ))}
            </ListGroup>
            {horizontalListData.map(({ item, color }, index) => (
              <ListGroup horizontal="sm" className="fw-bold pb-2" key={index}>
                {item.map((data, index) => (
                  <ListGroupItem className={`${index === 0 ? `b-l-${color}` : ""}`} key={index}>{data}</ListGroupItem>
                ))}
              </ListGroup>
            ))}
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default HorizontalLists