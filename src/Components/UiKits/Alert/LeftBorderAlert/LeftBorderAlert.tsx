import { useState } from 'react'
import { Alert, Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { LeftBorderAlerts } from '@/Constant';
import { leftData } from '@/Data/UiKits/Alert/AlertData';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

const LeftBorderAlert = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [visibleAlert, setVisibleAlert] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissAlert = () => setVisibleAlert(false);

  return (
    <Col lg="6">
      <Card className='height_equal'>
        <CardHeaderCommon title={LeftBorderAlerts} span={leftData} headClass='pb-0' />
        <CardBody className="live-dark">
          <Alert fade isOpen={visible} color="light-primary" className=" b-l-primary" toggle={onDismiss}>
            <SvgIcon iconId='help-circle' className='feather' />
            <p>You can check in on some of those fields below.</p>
          </Alert>
          <Alert fade isOpen={visibleAlert} color="light-secondary" className=" b-l-secondary mb-0" toggle={onDismissAlert}>
            <SvgIcon iconId='help-circle' className='feather' />
            <p>Well done! You successfully read this important message.</p>
          </Alert>
        </CardBody>
      </Card>
    </Col>
  )
}

export default LeftBorderAlert