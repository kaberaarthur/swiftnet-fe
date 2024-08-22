import { Card, CardBody, Col, Input, Label, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { ListsWithCheckboxs } from '@/Constant'
import { checkboxDataList, listCheckboxData } from '@/Data/UiKits/Lists/Lists'

const ListsWithCheckbox = () => {
  return (
    <Col md="4">
      <Card>
        <CardHeaderCommon title={ListsWithCheckboxs} span={listCheckboxData} headClass='pb-0'/>
        <CardBody className="dark-list">
          <ListGroup>
            <ListGroupItem>
              <Input className="me-3 checkbox-primary active" type="checkbox" id="firstCheckbox"/>
              <Label check className="font-primary mb-0" for="firstCheckbox">Auto Start</Label>
            </ListGroupItem>
            {checkboxDataList.map(({ color,text,id }, index) => (
              <ListGroupItem key={index}>
                <Input className={`me-3 checkbox-${color}`} type="checkbox" id={`firstCheckbox-${id}`} />
                <Label check className={`font-${color} mb-0`} for={`firstCheckbox-${id}`}>{text}</Label>
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ListsWithCheckbox