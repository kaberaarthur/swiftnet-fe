import { Col } from 'reactstrap'
import { DesignerTitle, Href } from '@/Constant'
import Link from 'next/link'

const ProfileName = () => {
  return (
    <>
      <Col sm="12" lg="4" className="order-sm-0 order-xl-1">
        <div className="user-designation">
          <div className="title">
            <Link href={Href}>
              {'Mark jecno'}
            </Link>
          </div>
          <div className="desc">{DesignerTitle}</div>
        </div>
      </Col>
    </>
  )
}

export default ProfileName