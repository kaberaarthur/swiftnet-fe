import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { ImagePath } from '@/Constant'
import { profileData } from '@/Data/UiKits/Modal/Modal'
import { ProfileModalType } from '@/Type/UiKits/UiKitsType'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardBody, Col, Modal } from 'reactstrap'

const ProfileModal:React.FC<ProfileModalType> = ({ modalOne, modalOneToggle }) => {
  return (
    <Modal fade centered isOpen={modalOne} toggle={modalOneToggle}>
      <div className="modal-dialog m-0">
        <div className="modal-content">
          <Col xl="12">
            <Card className="social-profile mb-0">
              <CardBody>
                <div className="social-img-wrap">
                  <div className="social-img">
                    <Image width={100} height={100} src={`${ImagePath}/avatar/1.jpg`} alt="profile" />
                  </div>
                  <div className="edit-icon">
                    <SvgIcon className='feather stroke-primary' iconId="check-circle" />
                  </div>
                </div>
                <div className="social-details">
                  <h5 className="mb-1">
                    <Link href="/app/social-app">Brooklyn Simmons</Link>
                  </h5>
                  <span className="f-light">@brookly.simmons</span>
                  <ul className="social-follow">
                    <li>
                      <h4 className="mb-0">1,908</h4>
                      <span className="font-light">Posts</span>
                    </li>
                    {profileData.map(({ heading, data }, index) => (
                      <li key={index}>
                        <h4 className="mb-0">{heading}</h4>
                        <span className="font-light">{data}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardBody>
            </Card>
          </Col>
        </div>
      </div>
    </Modal>
  )
}

export default ProfileModal