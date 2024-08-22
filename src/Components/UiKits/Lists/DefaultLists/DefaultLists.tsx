import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { DefaultList } from '@/Constant'
import { defaultData, defaultListData } from '@/Data/UiKits/Lists/Lists'
import SVG from '@/CommonComponent/SVG'

const DefaultLists = () => {
  return (
    <Col lg="4">
      <Card>
        <CardHeaderCommon title={DefaultList} span={defaultData} headClass='pb-0'/>
        <CardBody>
          <ListGroup>
            <ListGroupItem >
              <SVG iconId='right-3' className='svg-w-18 stroke-light me-1'  /> Logo Design
            </ListGroupItem>
            {defaultListData.map((item, index) => (
              <ListGroupItem key={index}>
                <SVG iconId='right-3' className='svg-w-18 stroke-light me-1'  />{item}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default DefaultLists