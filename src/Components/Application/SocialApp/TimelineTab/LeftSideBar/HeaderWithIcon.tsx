import { Button, CardHeader } from 'reactstrap'
import { HeaderWithIconPropsTypes } from '@/Type/Application/SocialApp/SocialApp'
import { ChevronDown, ChevronUp } from 'react-feather'

const HeaderWithIcon:React.FC<HeaderWithIconPropsTypes> = ({ setIsOpen, isOpen, Heading }) => {
  return (
    <CardHeader>
      <h2 className="mb-0">
        <Button block className="btn-link text-start d-flex justify-content-between" onClick={() => setIsOpen(!isOpen)} color="transparent" >
          {Heading}
          {isOpen ? (
            <ChevronUp className="m-0" />
          ) : (
            <ChevronDown className="m-0" />
          )}
        </Button>
      </h2>
    </CardHeader>
  )
}

export default HeaderWithIcon