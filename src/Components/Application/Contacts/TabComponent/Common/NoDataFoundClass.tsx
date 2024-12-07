import { Card, CardBody, CardHeader } from 'reactstrap'
import { NoDataFoundPropsType } from '@/Type/Application/Contacts/Contacts'

const NoDataFoundClass:React.FC<NoDataFoundPropsType> = ({ title }) => {
  return (
    <Card className="mb-0">
      <CardHeader className="d-flex">
        <h4>{title}</h4>
        <span className="f-14 pull-right mt-0">0 Contacts</span>
      </CardHeader>
      <CardBody>
        <p>No Data Found</p>
      </CardBody>
    </Card>
  )
}

export default NoDataFoundClass