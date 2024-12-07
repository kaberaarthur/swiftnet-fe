import { AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";

const StaticAccordion = () => {
  return (
    <AccordionItem className="accordion-wrapper">
      <AccordionHeader targetId="1" className="accordion-light-info">
        <span className="font-info">Knowledgebase featured tutorial detail.</span>
      </AccordionHeader>
      <AccordionBody accordionId="1">
        <div className="d-flex ">
          <div className="nested-accordion  w-50" id="nestedaccordion">
            <AccordionItem className="accordion-wrapper ">
              <AccordionHeader targetId="a1" className="accordion-light-tertiary">
                Web Development
              </AccordionHeader>
              <AccordionBody accordionId="a1">
                <p>This course is designed to start you on a path toward future studies in web development and design.</p>
              </AccordionBody>
            </AccordionItem>
          </div>
          <div className="nested-accordion w-50" id="nestedaccordion">
            <AccordionItem className="accordion-wrapper">
              <AccordionHeader targetId="b1" className="accordion-light-tertiary">
                UI/IX designer
              </AccordionHeader>
              <AccordionBody accordionId="b1">
                <p>The capacity to comprehend and experience other people's feelings is known as empathy. A positive consumer experience is priority by UX.</p>
              </AccordionBody>
            </AccordionItem>
          </div>
        </div>
      </AccordionBody>
    </AccordionItem>
  );
};

export default StaticAccordion;
