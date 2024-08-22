import { Card, Col } from 'reactstrap'
import { BasicInputGroup } from '@/Constant'
import BasicInputGroupsCardBody from './BasicInputGroupsCardBody'
import BasicInputGroupsCardFooter from './BasicInputGroupsCardFooter'
import { basicInputGroupData } from '@/Data/Forms/FormsControl/InputGroup/InputGroup'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BasicInputGroups = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={BasicInputGroup} span={basicInputGroupData} headClass='pb-0' />
        <BasicInputGroupsCardBody/>
        <BasicInputGroupsCardFooter />
      </Card>
    </Col>
  )
}

export default BasicInputGroups