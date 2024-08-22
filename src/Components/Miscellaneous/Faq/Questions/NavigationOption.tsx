import { AskOurCommunity, FaqContactUs, Href } from '@/Constant'
import { askQuestionData } from '@/Data/Miscellaneous/Faq/Faq'
import Link from 'next/link'
import { FaEnvelope, FaSms } from 'react-icons/fa'
import { Badge } from 'reactstrap'

const NavigationOption = () => {
  return (
    <div className="navigation-option">
      <ul>
        {askQuestionData.map((item, i) => (
          <li key={i}>
            <Link href={Href}>
              {item.icon} {item.title}
            </Link>
            {item.value && <Badge color="primary" pill className="pull-right">{item.value}</Badge>}
          </li>
        ))}
      </ul>
      <hr/>
      <ul>
        <li>
          <Link href={Href}>
            <FaSms/> {AskOurCommunity}
          </Link>
        </li>
        <li>
          <Link href={Href}>
           <FaEnvelope/> {FaqContactUs}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavigationOption