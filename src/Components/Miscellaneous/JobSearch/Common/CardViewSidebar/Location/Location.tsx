import { useState } from 'react'
import { Button, Card, CardBody, Collapse } from 'reactstrap';
import HeaderWithIcon from '../Filter/HeaderWithIcon';
import { AllLocations, LocationHeading } from '@/Constant';
import LocationCheckBox from './LocationCheckBox';

const Location = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Card>
      <HeaderWithIcon heading={LocationHeading} isOpen={isOpen} setIsOpen={setIsOpen} />
      <Collapse isOpen={isOpen}>
        <CardBody className="animate-chk">
          <LocationCheckBox />
        </CardBody>
        <Button block className="text-center w-100" color="primary">{AllLocations}</Button>
      </Collapse>
    </Card>
  );
}

export default Location