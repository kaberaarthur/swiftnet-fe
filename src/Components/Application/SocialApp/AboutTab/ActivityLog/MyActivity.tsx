import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { activityLogData } from '@/Data/Application/SocialApp/SocialApp'
import { AboutPropsType } from '@/Type/Application/SocialApp/SocialApp'

const MyActivity:React.FC<AboutPropsType> = ({ Heading }) => {
  return (
    <div className="my-activity">
      <h6 className="f-w-600 mb-3">{Heading}</h6>
      {activityLogData.map((item) => (
        <p key={item.id}>
          <span><SvgIcon iconId={item.icon} className='feather m-r-20' /></span>
          {item.description}
        </p>
      ))}
    </div>
  )
}

export default MyActivity