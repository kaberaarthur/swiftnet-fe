import { Card, CardBody, Col, Form } from 'reactstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { RTLSupportHeading } from '@/Constant'
import { countryDataList, rtlSupportData } from '@/Data/Forms/FormsWidgets/Typeahead/Typeahead'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const RtlSupport = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader title={RTLSupportHeading} span={rtlSupportData} headClass='pb-0'/>
        <CardBody>
          <div>
            <Form className="theme-form">
              <div>
                <Typeahead align="right" options={countryDataList} placeholder="Countries" id="RTL Support"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RtlSupport