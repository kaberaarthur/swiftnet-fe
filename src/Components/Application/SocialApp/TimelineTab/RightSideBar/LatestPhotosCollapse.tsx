import { FilterPropsType } from '@/Type/Application/SocialApp/SocialApp'
import { CardBody, Collapse } from 'reactstrap'
import { numbers } from '@/Data/Application/SocialApp/SocialApp'
import Image from 'next/image'
import { ImagePath } from '@/Constant'

const LatestPhotosCollapse:React.FC<FilterPropsType> = ({ isFilter }) => {
  return (
    <Collapse isOpen={isFilter}>
      <CardBody className="photos filter-cards-view px-0">
        <ul className="text-center">
          {numbers.map((data, index) => (
            <li key={index}>
              <div className="latest-post">
                <Image width={70} height={70} className="img-fluid" alt="user" src={`${ImagePath}/social-app/post-${data}.png`} />
              </div>
            </li>
          ))}
        </ul>
      </CardBody>
    </Collapse>
  )
}

export default LatestPhotosCollapse