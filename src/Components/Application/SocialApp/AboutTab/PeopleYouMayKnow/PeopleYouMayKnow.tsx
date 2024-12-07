import { Button, Card, CardBody, CardHeader, Col } from 'reactstrap'
import { AboutPropsType } from '@/Type/Application/SocialApp/SocialApp'
import { peopleYouMayKnowData } from '@/Data/Application/SocialApp/SocialApp'
import { AddFriend, ImagePath } from '@/Constant'
import Image from 'next/image'

const PeopleYouMayKnow:React.FC<AboutPropsType> = ({Heading}) => {
  return (
    <Col sm="12">
      <Card>
        <CardHeader>
          <h5>{Heading}</h5>
        </CardHeader>
        <CardBody className="avatar-showcase">
          <div className="pepole-knows">
            <ul>
              {peopleYouMayKnowData.map((data, index) => (
                <li key={index}>
                  <div className="add-friend text-center">
                    <Image width={60} height={60} className="img-60 img-fluid rounded-circle" alt="user" src={`${ImagePath}/${data.peopleImageName}`}/>
                    <span className="d-block">{data.peopleName}</span>
                    <Button color="primary" size="xs">{AddFriend}</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default PeopleYouMayKnow