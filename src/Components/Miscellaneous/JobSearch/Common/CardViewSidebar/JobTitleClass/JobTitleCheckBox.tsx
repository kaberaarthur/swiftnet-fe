import { CardBody, Input, Label } from 'reactstrap'
import { jobTitleData } from '@/Data/Miscellaneous/JobSearch/JobSearch'

const JobTitleCheckBox = () => {
  return (
    <CardBody className="animate-chk">
      {jobTitleData.map((data, index) => (
        <Label className="d-block" for={`check-${index}`} key={index} check>
          <Input className="checkbox-primary" id={`check-${index}`} type="checkbox" />
          {data.jobTitle}({data.jobNumber})
        </Label>
      ))}
    </CardBody>
  )
}

export default JobTitleCheckBox