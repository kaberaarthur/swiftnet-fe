import { Card, CardBody, Col, Input, Label, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ListsWithRadio } from '@/Constant'
import { listRadioData, listRadioDataList } from '@/Data/UiKits/Lists/Lists'

const ListsWithRadios = () => {
  return (
    <Col md="4">
      <Card>
        <CardHeaderCommon title={ListsWithRadio} span={listRadioData} headClass='pb-0' />
        <CardBody>
          <ListGroup >
            <ListGroupItem>
              <Input className="active radio-primary" type="radio" defaultChecked name="radio"/>
              <Label check className="mb-0 font-primary">Meditations</Label>
            </ListGroupItem>
            {listRadioDataList.map(({ color, text,id }, index) => (
              <ListGroupItem key={index}>
                <Input className={`radio-${color}`} type="radio" id={`secondRadio-${id}`} name="radio"/>
                <Label check className={`mb-0 font-${color}`} for={`secondRadio-${id}`}>{text}</Label>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ListsWithRadios