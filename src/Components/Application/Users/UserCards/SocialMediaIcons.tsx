import { tourProfileData } from '@/Data/Application/Users/UsersProfile/UsersProfile'
import { SocialMediaIconsPropsTypes } from '@/Type/Application/Users/UsersProfile'
import Link from 'next/link'
import { List } from 'reactstrap'

const SocialMediaIcons:React.FC<SocialMediaIconsPropsTypes> = ({ listClassName }) => {
  return (
    <List className={`${listClassName ? listClassName : ""}`} >
      {tourProfileData.map((data, index) => (
        <li key={index}>
          <Link href={data.link}>
            <i className={`fa fa-${data.icon} me-0 font-primary`}></i>
          </Link>
        </li>
      ))}
    </List>
  )
}

export default SocialMediaIcons