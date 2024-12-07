import { useState } from 'react'
import { Alert, Card, CardBody, Col } from 'reactstrap';
import { Clock, ThumbsUp } from 'react-feather';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { OutlineDarkLightAlerts } from '@/Constant';
import { outLineLightData } from '@/Data/UiKits/Alert/AlertData';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';

const OutlineDarkAndLightAlerts = () => {
  const [visible, setVisible] = useState(true);
  const [visibleAlert, setVisibleAlert] = useState(true);
  const [visibleAlertThree, setVisibleAlertThree] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissAlert = () => setVisibleAlert(false);
  const onDismissAlertThree = () => setVisibleAlertThree(false);
  return (
    <Col xl="6">
      <Card>
        <CardHeaderCommon title={OutlineDarkLightAlerts} span={outLineLightData} headClass="pb-0" />
        <CardBody>
          <Alert color="transparent" isOpen={visible} toggle={onDismiss} className="font-primary border-primary">
            <SvgIcon className='feather' iconId='clock' />
            <p className="text-truncate">One of <strong>YouTube's </strong> most crucial ranking factors is Watch Time.</p>
          </Alert>
          <Alert color="transparent" isOpen={visibleAlert} className="font-secondary border-secondary outline-2x alert-icons" toggle={onDismissAlert}>
            <SvgIcon className='feather' iconId='thumbs-up' />
            <p>One of <b>YouTubes</b>most crucial ranking factors is Watch Time.</p>
          </Alert>
          <Alert color="transparent" isOpen={visibleAlertThree} className="font-tertiary border-tertiary outline-2x alert-icons" toggle={onDismissAlertThree}>
            <SvgIcon className='feather' iconId='heart' />
            <p><b> Well done! </b>You successfully read this important message.</p>
          </Alert>
        </CardBody>
      </Card>
    </Col>
  )
}

export default OutlineDarkAndLightAlerts