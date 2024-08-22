import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { AgreeToTermsAndConditions, GitHubPlaceholder, Github, GiveFeedback, LinkedIn, LinkedInPlaceholder, SelectState } from '@/Constant';
import { NumberingWizardPropsType } from '@/Type/Forms/FormsLayout/FormsLayout';

const FeedbackForm :React.FC<NumberingWizardPropsType>= ({ getUserData, basicInputFormValue }) => {
    const { linkedInLink, gitHubLink, giveFeedBack } = basicInputFormValue;
  
    return (
      <Form className="stepper-three g-3 needs-validation custom-input" noValidate>
        <Row>
            <Col sm="6">
                <FormGroup>
                    <Label check>{LinkedIn}<span className="font-danger">*</span></Label>
                    <Input name="linkedInLink" value={linkedInLink} onChange={getUserData} type="url" placeholder={LinkedInPlaceholder} />
                </FormGroup>
            </Col>
            <Col sm="6">
                <FormGroup>
                    <Label check>{Github}<span className="font-danger">*</span></Label>
                    <Input name="gitHubLink" value={gitHubLink} onChange={getUserData} type="url" placeholder={GitHubPlaceholder} />
                </FormGroup>
            </Col>
            <Col xs="12">
                <FormGroup>
                    <Label check>{SelectState}<span className="font-danger">*</span></Label>
                    <Input type="select" name="state" onChange={getUserData}>
                        <option value="">Choose...</option>
                        <option value="U.K">U.K </option>
                        <option value="U.S">U.S </option>
                        <option value="India">India</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col xs="12">
                <FormGroup>
                    <Label>{GiveFeedback}</Label>
                    <Input type="textarea" name="giveFeedBack" value={giveFeedBack} onChange={getUserData} />
                </FormGroup>
            </Col>
            <Col xs="12">
                <FormGroup check>
                    <Input id="invalidCheck46" name="agreeConditions" onChange={getUserData} type="checkbox" required />
                    <Label for='invalidCheck46' className="form-check-label mb-0" check>{AgreeToTermsAndConditions}</Label>
                </FormGroup>
            </Col>
        </Row>
      </Form>
    );
  };

export default FeedbackForm