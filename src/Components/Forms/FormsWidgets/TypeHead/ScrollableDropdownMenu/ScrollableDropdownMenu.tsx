import { Card, CardBody, Col, Form } from 'reactstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { countryDataList, scrollableDropdownData } from '@/Data/Forms/FormsWidgets/Typeahead/Typeahead'
import { ScrollableDropDownMenuHeading } from '@/Constant'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const ScrollableDropdownMenu = () => {
  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader title={ScrollableDropDownMenuHeading} span={scrollableDropdownData} headClass='pb-0' />
        <CardBody>
          <div>
            <Form className="theme-form">
              <div>
                <Typeahead options={countryDataList} placeholder="Countries" id="Scrollable DropdownMenu"/>
              </div>
            </Form>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ScrollableDropdownMenu