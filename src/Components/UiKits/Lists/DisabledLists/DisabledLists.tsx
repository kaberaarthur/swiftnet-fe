import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { DisabledList, ImagePath } from '@/Constant'
import { disableList, disableListData } from '@/Data/UiKits/Lists/Lists'
import Image from 'next/image'

const DisabledLists = () => {
  return (
    <Col xxl="4" lg="6">
      <Card>
        <CardHeaderCommon title={DisabledList} span={disableListData} headClass='pb-0'/>
        <CardBody>
          <ListGroup>
            <ListGroupItem active className="list-group-item-action list-hover-primary " >
              <Image width={40} height={40} className="rounded-circle img-40" src={`${ImagePath}/avatar/1.jpg`} alt="user" />Teresa J. Mosteller
            </ListGroupItem>
            {disableList.map(({ text, className,src }, index) => (
              <ListGroupItem className={`list-group-item-action ${className ? className : ""}`} key={index} >
                <Image width={40} height={40} className="rounded-circle img-40" src={`${ImagePath}/${src}`} alt="user" />{text}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DisabledLists