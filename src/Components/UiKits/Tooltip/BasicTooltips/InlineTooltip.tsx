import { ButtonSmall, Href, InlineTooltipContent, TooltipSmall } from '@/Constant';
import Link from 'next/link';
import { useState } from 'react'
import { Button, Tooltip } from 'reactstrap';

const InlineTooltip = () => {
  const [basicTooltip, setBasicTooltip] = useState<boolean>(false);
  const [buttonTooltip, setButtonTooltip] = useState<boolean>(false);
  return (
    <div>
      <h4 className="mb-1 py-4 pb-0">{InlineTooltipContent}</h4>
      <p>
        Here, is some content about tooltips that you can set the
        <Link id="Tooltip-2" className="txt-primary fw-bold ms-1 me-1" href={Href}>{TooltipSmall}</Link>
        inside the content with help of tooltip and also you can add
        <Button id="Tooltip" color="secondary" className="text-white border-0 px-3 py-1 me-1 ms-1 mb-0">{ButtonSmall}</Button>.  Tooltips helps you to add more and more content. A tooltip is often used to specify extra information about something when the user moves the mouse pointer over an element
      </p>
      <Tooltip target="Tooltip-2" placement="top" isOpen={basicTooltip} toggle={()=>setBasicTooltip(!basicTooltip)}>tooltip</Tooltip>
      <Tooltip target="Tooltip" placement="top" isOpen={buttonTooltip} toggle={()=>setButtonTooltip(!buttonTooltip)}>button</Tooltip>
    </div>
  )
}

export default InlineTooltip