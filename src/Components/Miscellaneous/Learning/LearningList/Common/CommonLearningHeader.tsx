import React from 'react'
import { Button, CardHeader } from 'reactstrap'
import { ChevronDown, ChevronUp } from 'react-feather'
import { CommonLearningHeaderProp } from '@/Type/Miscellaneous/Learning/Learning'

const CommonLearningHeader:React.FC<CommonLearningHeaderProp> = ({heading,isOpen,setIsOpen}) => {
  return (
    <CardHeader>
      <h5 className="mb-0">
        <Button color="transparent" className="btn-link d-flex" onClick={() => setIsOpen(!isOpen)}>{heading}
        {isOpen ? <ChevronDown className="m-0" /> : <ChevronUp className="m-0" />}
        </Button>
      </h5>
    </CardHeader>
  )
}

export default CommonLearningHeader