"use client";

import { Container, Row } from 'reactstrap'
import TooltipFormValidation from './TooltipFormValidation/TooltipFormValidation'
import BrowserDefault from './BrowserDefault/BrowserDefault'
import ValidationForm from './ValidationForm/ValidationForm'
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { FormsControl, ValidationForms } from '@/Constant';


const FormsValidationContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={ValidationForms} parent={FormsControl} />
      <Container fluid>
        <Row>
          <TooltipFormValidation />
          <BrowserDefault />
          <ValidationForm/>
        </Row>
      </Container>
    </>
  )
}

export default FormsValidationContainer