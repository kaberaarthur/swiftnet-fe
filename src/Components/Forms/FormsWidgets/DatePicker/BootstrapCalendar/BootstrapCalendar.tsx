import { Card, Col } from 'reactstrap'
import { CalendarBootstrap } from '@/Constant'
import BootstrapCalendarBody from './BootstrapCalendarBody'
import { bootstrapCalendarData } from '@/Data/Forms/FormsWidgets/Datepicker/Datepicker'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'

const BootstrapCalendar = () => {
  return (
    <Col xl="6">
      <Card>
        <CommonCardHeader title={CalendarBootstrap} span={bootstrapCalendarData} headClass='pb-0' />
        <BootstrapCalendarBody/>
      </Card>
    </Col>
  )
}

export default BootstrapCalendar