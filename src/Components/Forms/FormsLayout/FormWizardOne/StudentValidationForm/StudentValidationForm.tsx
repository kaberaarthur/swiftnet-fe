import { Card, CardBody, Col } from 'reactstrap'
import { StudentValidationFormHeading } from '@/Constant'
import { studentValidationData } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne'
import StudentValidationFormCardBody from './StudentValidationFormCardBody'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const StudentValidationForm = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={StudentValidationFormHeading} span={studentValidationData} headClass='pb-0'/>
        <CardBody className="custom-input">
          <StudentValidationFormCardBody />
        </CardBody>
      </Card>
    </Col>
  )
}

export default StudentValidationForm