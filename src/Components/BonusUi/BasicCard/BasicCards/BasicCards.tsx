import { Card, CardBody, Col } from 'reactstrap'
import { BasicCardHeading } from '@/Constant'
import { basicCardData } from '@/Data/BonusUi/BasicCard/BasicCard'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const BasicCards = () => {
  const BasicCardText1 = "Tabs have long been used to show alternative views of the same group of information tabs in software. Known as";
  const BasicCardText2 = " , these are still used today in web sites. For instance, airline companies such as Ryanair, easyJet and AirMalta use module tabs to enable the user to switch between bookings for flights, hotels and car hire.";
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={BasicCardHeading} span={basicCardData} headClass='pb-0'/>
        <CardBody>
          <p className="mb-0">
            {BasicCardText1}<em className="font-danger">“module tabs”</em>{BasicCardText2}
          </p>
        </CardBody>
      </Card>
    </Col>
  )
}

export default BasicCards