import { Card, Col } from 'reactstrap'
import ProfileIntroCard from './ProfileIntroCard'
import FollowerCard from './FollowerCard'
import FollowingsCard from './FollowingsCard'
import LatestPhotos from './LatestPhotos'
import FriendsCard from './FriendsCard'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const RightSideBar = () => {
  return (
    <>
      <ProfileIntroCard />
      <FollowerCard />
      <FollowingsCard />
      <LatestPhotos />
      <FriendsCard />
      <Col xl="12" className="xl-50 box-col-6">
        <Card>
          <Image width={376} height={251} className="img-fluid" src={`${ImagePath}/social-app/timeline-4.png`} alt="timeline"/>
        </Card>
      </Col>
    </>
  )
}

export default RightSideBar