import { useState } from 'react';
import CommonModal from '../Common/CommonModal';
import WedDesigners from './WedDesigners';
import UXDesigner from './UXDesigner';
import { Button } from 'reactstrap';
import { ScrollingContent, ScrollingModalHeading } from '@/Constant';

const ScrollingModal = () => {
  const [scrollingModal, setScrollingModal] = useState(false);
  const scrollModalToggle = () => setScrollingModal(!scrollingModal);
  return (
    <>
      <Button color="success" className='px-xl-2 px-xxl-3' onClick={scrollModalToggle}>{ScrollingContent}</Button>
      <CommonModal isOpen={scrollingModal} toggle={scrollModalToggle} title={ScrollingModalHeading}>
        <WedDesigners />
        <UXDesigner />
      </CommonModal>
    </>
  )
}

export default ScrollingModal