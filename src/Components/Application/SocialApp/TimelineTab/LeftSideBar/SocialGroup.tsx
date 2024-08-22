import { ImagePath } from '@/Constant'
import { socialGroupData } from '@/Data/Application/SocialApp/SocialApp'
import Image from 'next/image'
import { UncontrolledTooltip } from 'reactstrap'

const SocialGroup = () => {
  return (
    <ul>
      {socialGroupData.map((data, index) => (
        <li className="d-inline-block" key={index}>
          <Image width={40} height={40} className="img-40 rounded-circle" src={`${ImagePath}/avatar/${data.imageName}`} alt="Img" id={`UncontrolledTooltipExample-${index}`} />
          <UncontrolledTooltip placement="top" target={`UncontrolledTooltipExample-${index}`}>
            {data.userName}
          </UncontrolledTooltip>
        </li>
      ))}
    </ul>
  )
}

export default SocialGroup