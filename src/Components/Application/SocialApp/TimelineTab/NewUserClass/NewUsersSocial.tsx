import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { ImagePath } from '@/Constant'
import { TimelineDataType } from '@/Type/Application/SocialApp/SocialApp'
import Image from 'next/image'

const NewUsersSocial:React.FC<TimelineDataType> = ({data}) => {
  return (
    <div className="new-users-social">
      <div className='d-flex'>
        <Image width={60} height={60} className="rounded-circle image-radius m-r-15" src={`${ImagePath}/avatar/4.jpg`} alt="user121"/>
        <div className='flex-grow-1'>
          <h6 className="mb-0 f-w-600">{data.name}</h6>
          <p>{data.date}</p>
        </div>
        <span className="pull-right mt-0">
          <SvgIcon iconId='more-vertical' className='feather' />
        </span>
      </div>
    </div>
  )
}

export default NewUsersSocial