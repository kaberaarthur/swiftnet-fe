"use client";
import { ChangeEvent, useState } from 'react'
import { Button, Col, Container, Form, Progress, Row } from 'reactstrap'
import SideBarList from './SideBarList'
import { EmailPassWord, Finish, Next, Previous, SignUpToAccount } from '@/Constant'
import { toast } from 'react-toastify'
import SignUpAccount from './SignUpAccount'
import EmailPassword from './EmailPassword'
import AddMessage from './AddMessage'

const RegisterWizardContainer = () => {
    const [formValue, setFormValue] = useState({firstName: "",lastName: "",contactNumber: "",email: "",password: "",confirmPassword: "",birthDate: "",age: "",passPort: ""});
    const [showFinish, setShowFinish] = useState(false);
    const handleBackButton = () => {
      setShowFinish(false);
      if (level === 2) {setLevel(level - 1);}
      if (level === 3) {setLevel(level - 1);}
    };
    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
      let name = event.target.name;
      let value = event.target.value;
      setFormValue({ ...formValue, [name]: value });
    };
    const handleNextButton = () => {
      const {firstName,lastName,contactNumber,email,password,confirmPassword,birthDate,age,passPort} = formValue;
      if (firstName !== "" &&lastName !== "" &&contactNumber !== "" &&level === 1) {
        setLevel(level + 1);
      } else if (email !== "" &&password !== "" &&confirmPassword !== "" &&level === 2) {
        setLevel(level + 1);
      } else if (birthDate !== "" &&age !== "" &&passPort !== "" &&level === 3) {
        setShowFinish(true);
      } else {
        toast.error("please fill all field after press next button");
      }
    };
  
    const [level, setLevel] = useState(1);
  return (
    <Container fluid className='wizard-4'>
      <Row>
        <Col lg="3" md="4" className="position-relative">
          <div><SideBarList level={level} /></div>
        </Col>
        <Col lg="9" md="8" className='p-0'>
          <div className="step-container login-card">
            <div>
              <div className="wizard-title text-center">
                <h2>{SignUpToAccount}</h2>
                <h5 className="text-muted mb-4">{EmailPassWord}</h5>
              </div>
              <div className="login-main">
                <Progress value={15} /> 
                <Form className="theme-form">
                  <div className="registration-content">
                    {level === 1 && (<SignUpAccount formValue={formValue} getUserData={getUserData}/>)}
                    {level === 2 && (<EmailPassword formValue={formValue} getUserData={getUserData}/>)}
                    {level === 3 && (<AddMessage formValue={formValue} getUserData={getUserData}/>)}
                    <div className="mb-3 wizard-navigation">
                      {level > 1 && (<div className="p-2"><Button outline size='lg' color={`primary `} onClick={handleBackButton}>{Previous}</Button></div>)}
                      <div>{level !== 3 ? (<Button color='primary' size='lg' onClick={handleNextButton} className={`text-center ${showFinish ? "buttonDisabled" : ""}`}>{Next}</Button>) : (<Button color='primary' size='lg' onClick={() =>toast.success("form submitted successfully")}>{Finish}</Button>)}</div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterWizardContainer