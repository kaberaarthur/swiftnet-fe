import React from 'react'
import CommonModal from '../Common/CommonModal';
import ToggleChildModal from './ToggleChildModal';
import { Button } from 'reactstrap';
import { Cancel, ConnectNewAccount, ImagePath, ParentToggleTitle } from '@/Constant';
import Image from 'next/image';
import { ToggleModalType } from '@/Type/UiKits/UiKitsType';


const ToggleParentModal:React.FC<ToggleModalType> = ({ nestedModal, closeAll, toggle, toggleNested, toggleAll } ) => {
    return (
      <div className="modal-toggle-wrapper">
        <ul className="modal-img ">
          <li><Image width={100} height={100} src={`${ImagePath}/gif/instagram.gif`} alt="instagram" /></li>
          <li><Image width={100} height={100} src={`${ImagePath}/gif/whatapp.gif`} alt="whatsapp" /></li>
          <li><Image width={100} height={100} src={`${ImagePath}/gif/facebook.gif`} alt="facebook" /></li>
        </ul>
        <h6>{ParentToggleTitle}</h6>
        <Button color="dark" className="rounded-pill w-100 mt-4" onClick={toggleNested}>{ConnectNewAccount}</Button>
        <CommonModal centered isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
          <ToggleChildModal toggleAll={toggleAll}/>
        </CommonModal>
        <Button color="white"  className="rounded-pill w-100 dark-toggle-btn" onClick={toggle}>{Cancel}</Button>
      </div>
    );
  };

export default ToggleParentModal