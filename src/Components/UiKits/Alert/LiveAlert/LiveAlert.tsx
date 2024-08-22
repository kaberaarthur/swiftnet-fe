import { useState } from 'react'
import { Alert, Button, Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { LiveAlerts, ShowLiveAlert } from '@/Constant';
import { liveAlertData } from '@/Data/UiKits/Alert/AlertData';

const LiveAlert = () => {
  const [data, setData] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);
  const dataShown = (key: number) => {
    setData(data.filter((item, index) => index !== key));
  };
  return (
    <Col lg="6">
      <Card className='height_equal'>
        <CardHeaderCommon title={LiveAlerts} span={liveAlertData} headClass='pb-0' />
        <CardBody className="live-dark">
          <Alert color="light-info" isOpen={visible} toggle={onDismiss} className="font-info">
            <p className="text-truncate">Oh snap! Change a few things up Notification check</p>
          </Alert>
          {data.length > 0 &&
            data.map((item, index) => (
              <Alert fade color="light-light" className="alert-dismissible" key={index}>
                <p className="text-dark">Nice, you triggered this alert message!</p>
                <Button close onClick={() => dataShown(index)}></Button>
              </Alert>
            ))}
          <Button color="dark" onClick={() => setData(() => [...data, "Alerts"])}>{ShowLiveAlert}</Button>
        </CardBody>
      </Card>
    </Col>
  )
}

export default LiveAlert