import { CardBody, Collapse } from 'reactstrap'
import { FilterPropsType } from '@/Type/Application/SocialApp/SocialApp'
import { mutualFriendData } from '@/Data/Application/SocialApp/SocialApp'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const MutualFriendsCollapse:React.FC<FilterPropsType> = ({ isFilter }) => {
  return (
    <Collapse isOpen={isFilter}>
      <CardBody className="social-status filter-cards-view">
        {mutualFriendData.map((data, index) => (
          <div className='d-flex align-items-center' key={index}>
            <Image width={50} height={50} className="img-50 rounded-circle m-r-15" src={`${ImagePath}/avatar/${data.imageName}`} alt="user" />
            <div className={`social-status ${data.socialClass}`} />
            <div className='flex-grow-1'>
              <span className="f-w-600 d-block">{data.title}</span>
              <span className="d-block">{data.email}</span>
            </div>
          </div>
        ))}
      </CardBody>
    </Collapse>
  )
}

export default MutualFriendsCollapse