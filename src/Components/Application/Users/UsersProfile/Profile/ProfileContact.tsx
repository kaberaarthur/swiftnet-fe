import { Col, Row } from 'reactstrap'
import { userProfileData } from '@/Data/Application/Users/UsersProfile/UsersProfile'

const ProfileContact = () => {
  return (
    <Col sm="6" lg="4" className="order-sm-2 order-xl-2">
      <Row>
        {userProfileData.slice(2,4).map((data,i)=>(
          <Col md="6" key={i}>
            <div className="ttl-info text-start">
              <h6>
                <i className={`fa fa-${data.icon}`} /> {data.title}
              </h6>
              <span>{data.detail}</span>
            </div>
          </Col>
        ))}
      </Row>
    </Col>
  )
}

export default ProfileContact