import { Fragment, useState } from 'react'
import CommonModal from '../../Common/CommonModal';
import { ChevronsRight } from 'react-feather';
import { ExtraLargeModals, WebDesign } from '@/Constant';
import { Button } from 'reactstrap';
import { fullScreenData } from '@/Data/UiKits/Modal/Modal';

const ExtraLargeModal = () => {
  const [extraLargeScreen, setExtraLargeScreen] = useState(false);
  const extraLargeScreenToggle = () => setExtraLargeScreen(!extraLargeScreen);
  return (
    <>
      <Button color="info" onClick={extraLargeScreenToggle}>{ExtraLargeModals}</Button>
      <CommonModal size="xl" isOpen={extraLargeScreen} toggle={extraLargeScreenToggle} sizeTitle="Extra Large modal">
        <div className="large-modal-header">
          <ChevronsRight />
          <h5 className="f-w-600">{WebDesign}</h5>
        </div>
        <p className="modal-padding-space">We build specialised websites for companies, list them on digital directories, and set up a sales funnel to boost ROI.</p>
        {fullScreenData.map(({ title, text }, index) => (
          <Fragment key={index}>
            <div className="large-modal-header">
              <ChevronsRight />
              <h5 className="f-w-600">{title}</h5>
            </div>
            <p className="modal-padding-space">{text}</p>
          </Fragment>
        ))}
      </CommonModal>
    </>
  )
}

export default ExtraLargeModal