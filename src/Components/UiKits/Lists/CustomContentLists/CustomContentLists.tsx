import { Card, CardBody, Col, ListGroup, ListGroupItem } from 'reactstrap'
import DynamicCustomContentList from './DynamicCustomContentList'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { CustomContentList, ImagePath, MollyBoake } from '@/Constant'
import { customData } from '@/Data/UiKits/Lists/Lists'
import Image from 'next/image'

const CustomContentLists = () => {
  return (
    <Col md="12">
      <Card>
        <CardHeaderCommon title={CustomContentList} span={customData} headClass='pb-0' />
        <CardBody>
          <ListGroup className=" main-lists-content">
            <ListGroupItem active className=" list-group-item-action bg-primary">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <div className="list-wrapper">
                  <Image width={55} height={55} className="list-img" src={`${ImagePath}/avatar/1.jpg`} alt="profile" />
                  <div className="list-content">
                    <h5 className='txt-light'>{MollyBoake}</h5>
                    <p className="text-white">MollyBoake@rhyta.com</p>
                  </div>
                </div>
                <small>5 days ago</small>
              </div>
              <p className="mb-1">Next step is to choose a tone of voice for your content type. From casual to convincing, pick one from 20+ tones in the dropdown.Why did we say “snag eyeballs” instead of “get attention?” Why do we say “brick-and-mortar words” instead of “concrete words?” Because, in your email subject lines, it’s better to use words that people can picture.</p>
              <small>20K Followers</small>
            </ListGroupItem>
            <DynamicCustomContentList />
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomContentLists