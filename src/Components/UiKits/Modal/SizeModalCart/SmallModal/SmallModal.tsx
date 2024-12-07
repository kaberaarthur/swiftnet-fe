import { Fragment, useState } from 'react'
import CommonModal from '../../Common/CommonModal';
import { SmallModals } from '@/Constant';
import { Button } from 'reactstrap';
import SvgIcon from '@/CommonComponent/SVG/SvgIcon';
import { smallData } from '@/Data/UiKits/Modal/Modal';

const SmallModal = () => {
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const smallScreenToggle = () => setSmallScreen(!smallScreen);
  return (
    <>
      <Button color="primary" onClick={smallScreenToggle}>{SmallModals}</Button>
      <CommonModal size="sm" isOpen={smallScreen} toggle={smallScreenToggle} sizeTitle="Small modal" modalBodyClassName="dark-modal">
        <div className="large-modal-header">
          <SvgIcon iconId='chevrons-right' className='feather' />
          <h6>Web Design </h6>
        </div>
        <p className="modal-padding-space mb-2">We build specialised websites for companies, list them on digital directories, and set up a sales funnel to boost ROI.</p>
        {smallData.map(({ title, text }, index) => (
          <Fragment key={index}>
            <div className="large-modal-header">
              <SvgIcon iconId='chevrons-right' className='feather' />
              <h6>{title}</h6>
            </div>
            <p className="modal-padding-space">{text}</p>
          </Fragment>
        ))}
      </CommonModal>
    </>
  )
}

export default SmallModal