import { useState } from 'react'
import { Button, Card, Collapse } from 'reactstrap';
import HeaderWithIcon from '../Filter/HeaderWithIcon';
import { AllSkills, SpecificSkills } from '@/Constant';
import SkillCheckBox from './SkillCheckBox';

const SkillClass = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Card>
      <HeaderWithIcon heading={SpecificSkills} isOpen={isOpen} setIsOpen={setIsOpen}/>
      <Collapse isOpen={isOpen}>
        <SkillCheckBox/>            
        <Button block className='text-center' color='primary'>{AllSkills}</Button>
      </Collapse>
    </Card>
  );
}

export default SkillClass