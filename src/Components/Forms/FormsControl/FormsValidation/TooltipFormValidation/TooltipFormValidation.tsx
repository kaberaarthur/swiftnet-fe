import { Card, CardBody, Col } from 'reactstrap'
import { FormValidationTooltip } from '@/Constant'
import { tooltipFormSubTitle, tooltipInitialValue, tooltipValidationSchema } from '@/Data/Forms/FormsControl/FormsValidation/FormsValidation'
import { useState } from 'react'
import { Formik } from 'formik'
import TooltipValidationForm from './TooltipValidationForm'
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader'
import { TooltipValidationProp } from '@/Type/Forms/FormControls/FormsControls'


const TooltipFormValidation = () => { 
  const [submitErrors, setSubmitError] = useState<boolean>(false);

  const submitHandler = (values: TooltipValidationProp, { resetForm }: { resetForm: () => void }) => {
    resetForm();
    setSubmitError(false);
  };

  return (
    <Col sm="12">
      <Card>
        <CommonCardHeader title={FormValidationTooltip} span={tooltipFormSubTitle} headClass='pb-0' />
        <CardBody>
          <Formik initialValues={tooltipInitialValue} onSubmit={submitHandler} validationSchema={tooltipValidationSchema}>
            {({ errors }) => <TooltipValidationForm errors={errors} setSubmitError={setSubmitError} submitErrors={submitErrors} />}
          </Formik>
        </CardBody>
      </Card>
    </Col>
  );
  
}

export default TooltipFormValidation