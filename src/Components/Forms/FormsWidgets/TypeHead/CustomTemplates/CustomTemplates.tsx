import { Card, CardBody, Col, Form } from 'reactstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { customTemplateData, oscarWinnerData } from '@/Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { CustomTemplate } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const CustomTemplates = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader title={CustomTemplate} span={customTemplateData} headClass='pb-0'/>
        <CardBody>
          <div>
            <Form className="theme-form">
              <div>
                <Typeahead options={oscarWinnerData} placeholder="Oscar winners" id="Custom Templates"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default CustomTemplates