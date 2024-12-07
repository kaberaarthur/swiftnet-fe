import { useState } from 'react'
import CommonModal from '../../Common/CommonModal';
import { Button, Tooltip } from 'reactstrap';
import Link from 'next/link';
import { ButtonSmall, Href, PopoverModal, TooltipPopoverModal, TooltipsAndPopovers, TooltipsModal } from '@/Constant';

const ToolTipAndPopover = () => {
  const [toolAndPopover, setToolAndPopover] = useState(false);
  const tooltipsAndPopoversToggle = () => setToolAndPopover(!toolAndPopover);
  const [tooltipLinkOne, setTooltipLinkOne] = useState(false);
  const toggleLinkOne = () => setTooltipLinkOne(!tooltipLinkOne);

  return (
    <>
      <Button color="info" className='px-xl-2 px-xxl-3' onClick={tooltipsAndPopoversToggle}>{TooltipsAndPopovers}</Button>
      <CommonModal isOpen={toolAndPopover} toggle={tooltipsAndPopoversToggle} title={TooltipPopoverModal}>
        <h5>{PopoverModal}</h5>
        <p className="mt-2">{`This `}
          <Button color="success" className="popover-test" title="this is amazing content" id='TooltipExample1'>{ButtonSmall}</Button>{` triggers a popover on click.`}
        </p>
        <Tooltip autohide placement="right" target="TooltipExample1" isOpen={tooltipLinkOne} toggle={toggleLinkOne}>this is amazing content</Tooltip>
        <hr />
        <h5>{TooltipsModal}</h5>
        <p className="mt-2">
          <Link className="tooltip-test text-info" href={Href} id="TooltipExample">{` This link `}</Link>
          <Tooltip autohide placement="top" target="TooltipExample" isOpen={tooltipLinkOne} toggle={toggleLinkOne}>Tooltip</Tooltip>and
          <Link className="tooltip-test text-info" href={Href} id="TooltipExample">{` that link `}</Link>
          <Tooltip placement="top" target="TooltipExample" isOpen={tooltipLinkOne} toggle={toggleLinkOne}>Tooltip</Tooltip>have tooltips on hover.
        </p>
      </CommonModal>
    </>
  )
}

export default ToolTipAndPopover