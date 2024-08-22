import { Card, CardBody, Col } from 'reactstrap';
import { BasicExamples} from '@/Constant';
import ClickItBtn from './ClickItBtn';
import TitleWithTextBtn from './TitleWithTextBtn';
import InformationalBtn from './InformationalBtn';
import WarningAlertsBtn from './WarningAlertsBtn';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';

const BasicExample = () => {
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={BasicExamples} headClass='pb-0'/>
        <CardBody className="btn-showcase">
          <ClickItBtn />
          <TitleWithTextBtn />
          <InformationalBtn />
          <WarningAlertsBtn />
        </CardBody>
      </Card>
    </Col>
  );
}

export default BasicExample