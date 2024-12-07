import { Media } from 'reactstrap'
import { EmailAddress, General, ImagePath } from '@/Constant'
import { PrintPreviewPropsType } from '@/Type/Application/Contacts/Contacts'
import Image from 'next/image'

const PrintPreview:React.FC<PrintPreviewPropsType> = ({selectedUser}) => {
  return (
    <div className="profile-mail pt-0" id="DivIdToPrint">
      <div className="d-flex align-items-center">
        <Image width={100} height={100} className= 'img-100 img-fluid m-r-20 rounded-circle' src= {`${ImagePath}/${selectedUser.avatar}`} alt= 'users' />
        <Media className="flex-grow-1 mt-0">
          <h5>
            <span id="printname">{selectedUser.name}</span>
            <span id="printlast">{selectedUser.sureName}</span>
          </h5>
          <p>{selectedUser.name}{'@gmail.com'}</p>
        </Media >
      </div>
      <div className="email-general">
        <h6>{General}</h6>
        <p>{EmailAddress}:<span className="font-primary" id="mailadd">{selectedUser.sureName}{'@gmail.com'}</span></p>
      </div>
    </div>
  )
}

export default PrintPreview