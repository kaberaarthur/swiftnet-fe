import { ImagePath } from '@/Constant'
import { PlacementToastContentProp } from '@/Type/BonusUi/BonusUiTypes'
import Image from 'next/image'
import { Toast, ToastBody } from 'reactstrap'

const PlacementToastContent:React.FC<PlacementToastContentProp> = ({ data }) => {
  return (
    <div className="bg-light position-relative bd-example-toasts">
      <div className={`toast-container p-3 position-absolute ${data}`}>
        <Toast fade>
          <div className="toast-img toast-header">
            <Image width={30} height={30} className="rounded me-2" src={`${ImagePath}/avatar/1.jpg`} alt="profile" />
            <strong className="me-auto">Edmin theme</strong>
            <small className="d-sm-block d-none">25 min ago</small>
          </div>
          <ToastBody className="toast-dark font-dark">
            <p className="toast-content"><em className="font-danger">Attackers</em> on malicious activity may trick you into doing something dangrous like installing software or revealing your personal informations.</p>
          </ToastBody>
        </Toast>
      </div>
    </div>
  )
}

export default PlacementToastContent