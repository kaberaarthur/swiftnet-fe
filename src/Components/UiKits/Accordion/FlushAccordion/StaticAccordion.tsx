import { AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

const StaticAccordion = () => {
  return (
    <AccordionItem>
      <AccordionHeader targetId="1">Flush accordion Item #1</AccordionHeader>
      <AccordionBody accordionId="1">
        Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item&apos;s accordion body. Let's imagine this being filled with some actual content. that use for remove default border and background colors.
      </AccordionBody>
    </AccordionItem>
  )
}

export default StaticAccordion