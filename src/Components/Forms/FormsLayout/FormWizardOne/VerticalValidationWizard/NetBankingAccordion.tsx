//  @ts-nocheck
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { NetBanking, SelectYourBank } from '@/Constant'
import { useState } from 'react';
import { netBankingList } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne';
import { NetBankingAccordionProp } from '@/Type/Forms/FormsLayout/FormsLayout';
import FeatherIcons from './FeatherIconCom';

const NetBankingAccordion:React.FC<NetBankingAccordionProp> = ({ netBankingFormValues, getUserData }) => {
  const [open, setOpen] = useState("");
  const toggle = (id: string) => (open === id ? setOpen("") : setOpen(id));
  const { bankName } = netBankingFormValues;
  return (
    <Accordion open={open} toggle={toggle} className="dark-accordion">
      <AccordionItem>
        <AccordionHeader targetId="1">{NetBanking}
          <FeatherIcons iconName={open === "1" ? "ChevronUp" : "ChevronDown"} className="svg-color" />
        </AccordionHeader>
        <AccordionBody accordionId="1" className="weight-title card-wrapper">
          <h6 className="sub-title f-14">{SelectYourBank}</h6>
          <Row className="choose-bank">
            {netBankingList.map((data, index) => (
              <Col sm="6" key={index}>
                {data.bankList.map((bankNames, number) => (
                  <FormGroup check key={number} className="radio radio-primary">
                    <Input id={bankNames} type="radio" name="bankName" onChange={getUserData} checked={bankNames === bankName} value={bankNames} />
                    <Label for={bankNames} check>{bankNames} {number}</Label>
                  </FormGroup>
                ))}
              </Col>
            ))}
          </Row>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  )
}

export default NetBankingAccordion