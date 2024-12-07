import { Card, CardBody, Col, Form } from 'reactstrap'
import { MultipleSectionWithHeader } from '@/Constant'
import { multiWithHeaderData, multipleSectionHeaderData } from '@/Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { Typeahead } from 'react-bootstrap-typeahead'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const MultipleSectionsWithHeaders = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader  title={MultipleSectionWithHeader} span={multipleSectionHeaderData} headClass='pb-0'/>
        <CardBody>
          <div>
            <Form className="theme-form">
              <div>
                <Typeahead options={multiWithHeaderData} multiple clearButton placeholder="NBA and NHL teams" labelKey="name" id="1" />
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MultipleSectionsWithHeaders