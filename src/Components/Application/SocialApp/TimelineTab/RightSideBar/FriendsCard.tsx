import { useState } from 'react'
import { Card, CardBody, Col, Collapse } from 'reactstrap';
import HeaderWithIcon from '../LeftSideBar/HeaderWithIcon';
import { Friends, ImagePath } from '@/Constant';
import { friendsImageName } from '@/Data/Application/SocialApp/SocialApp';
import Image from 'next/image';

const FriendsCard = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Col xl="12" className="xl-50 box-col-6">
      <Card>
        <HeaderWithIcon Heading={Friends} isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Collapse isOpen={isOpen}>
          <CardBody className="avatar-showcase filter-cards-view">
            {friendsImageName.map((data, index) => (
              <div className="d-inline-block friend-pic" key={index}>
                <Image width={50} height={50} className="img-50 rounded-circle" src={`${ImagePath}/avatar/${data}`} alt="images" />
              </div>
            ))}
          </CardBody>
        </Collapse>
      </Card>
    </Col>
  );
}

export default FriendsCard