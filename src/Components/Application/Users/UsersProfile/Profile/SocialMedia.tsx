import { tourProfileData } from '@/Data/Application/Users/UsersProfile/UsersProfile'
import Link from 'next/link'
import { List, ListInlineItem } from 'reactstrap'

const SocialMedia = () => {
  return (
    <div className="social-media" >
      <List type="inline">
        {tourProfileData.map((item, index) => (
          <ListInlineItem  key={index}>
            <Link href={item.link} target="_blank">
              <i className={`fa fa-${item.icon}`} />
            </Link>
          </ListInlineItem>
        ))}
      </List>
    </div>
  )
}

export default SocialMedia