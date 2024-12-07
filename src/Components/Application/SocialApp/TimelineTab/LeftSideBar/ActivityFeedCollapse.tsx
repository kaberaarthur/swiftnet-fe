import { FilterPropsType } from '@/Type/Application/SocialApp/SocialApp'
import { CardBody, Collapse } from 'reactstrap'
import { friendsData } from '@/Data/Application/SocialApp/SocialApp'
import { Href, ImagePath, Photo } from '@/Constant'
import Image from 'next/image'
import Link from 'next/link'

const ActivityFeedCollapse:React.FC<FilterPropsType> = ({ isFilter }) => {
  return (
    <Collapse isOpen={isFilter}>
      <CardBody className="social-status filter-cards-view">
        {friendsData.map((data, index) => (
          <div className='d-flex align-items-center' key={index}>
            <Image width={50} height={50} className="img-50 rounded-circle m-r-15" src={`${ImagePath}/avatar/${data.imageName}`} alt="user"/>
            <div className='flex-grow-1'>
              <span className="f-w-600 d-block">{data.title}</span>
              <p>{"Commented on Shaun Park's "}
                <Link href={Href} className='font-primary'>{Photo}</Link>
              </p>
              <span className="light-span">{data.time} {'Ago'}</span>
            </div>
          </div>
        ))}
      </CardBody>
    </Collapse>
  )
}

export default ActivityFeedCollapse