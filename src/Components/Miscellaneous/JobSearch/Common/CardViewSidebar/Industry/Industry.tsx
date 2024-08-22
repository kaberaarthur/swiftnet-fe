import { useState } from 'react'
import { Button, Card, Collapse } from 'reactstrap';
import HeaderWithIcon from '../Filter/HeaderWithIcon';
import { AllIndustries, IndustryHeading } from '@/Constant';
import IndustryCheckBox from './IndustryCheckBox';

const Industry = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Card>
      <HeaderWithIcon heading={IndustryHeading} isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Collapse isOpen={isOpen}>
        <IndustryCheckBox/>
        <Button block className='w-100 text-center' color='primary'>{AllIndustries}</Button>
      </Collapse>
    </Card>
  );
}

export default Industry