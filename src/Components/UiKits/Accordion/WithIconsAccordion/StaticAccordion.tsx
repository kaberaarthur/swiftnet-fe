import SVG from '@/CommonComponent/SVG'
import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const StaticAccordion = () => {
  return (
    <AccordionItem>
      <AccordionHeader color='light-secondary' targetId="1" className="gap-2 accordion-light-secondary txt-secondary">
        <SVG className="svg-color stroke-secondary me-2" iconId='Bell'/>  <span className="font-secondary">Keep in touch</span>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <p>
          <em className="font-danger"> " This page might not behave as expected because Windows Internet Explorer isn't configured to load unsigned ActiveX controls."</em> or "Allow this page to install an unsigned ActiveX Control? Doing so from untrusted sources may harm your computer." (Both phrased as conditions that may cause future problems.)
        </p>
      </AccordionBody>
    </AccordionItem>
  )
}

export default StaticAccordion