import { useState } from "react";
import CommonLogo from "./CommonLogo";
import { Button, Col, Form, FormGroup, Input, Label, Row, Alert } from "reactstrap";
import { AgreeWith, CreateAccount, CreateYourAccount, EmailAddress, EmailsPlaceHolder, FirstName, LastName, Password, PrivacyPolicy, SignIn, SignUpWith, YourName } from "@/Constant";
import Link from "next/link";
import { CommonIcon } from "./CommonIcon";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { setUserDetails } from '../../../../Redux/Reducers/userSlice';

// Interface for the user data structure
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  company_id: number;
  company_username: string; // Note: no null here
  usertoken: string;
  active: number;
}

// Interface for the login response
interface RegisterResponse {
  message: string;
  token: string;
  user: User;
}

interface RegisterFormProps {
  alignLogo?: string; // Adjust the type based on the actual expected type (e.g., boolean, string, etc.)
}

const CommonRegisterForm: React.FC<RegisterFormProps> = ({ alignLogo }) => {
  const [showPassWord, setShowPassWord] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [customAlert, setCustomAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  

  const showAlert = (message: string, type: string) => {
    setCustomAlert({ message, type });
    setTimeout(() => {
      setCustomAlert({ message: "", type: "" });
    }, 5000);
  };

  // First create a company to get company_id - This can happen in the backend
  // Then create a user

  const createAccount = async () => {
    setLoading(true);
    const name = `${firstName} ${lastName}`.trim(); // Merge first and last name
    const body = {
        name,
        email,
        phone: phoneNumber,
        password,
        company_name: companyName,
    };

    console.log("Sending signup request with: ", body);

    try {
        const response = await fetch("http://localhost:8000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log("Signup response:", data);

        if (response.ok) {
            showAlert("Account created successfully!", "success");

            // Format data for Redux dispatch
            const userDetailsForRedux = {
              ...data.user,
              usertoken: data.token
            };
            
            // Dispatch user details to Redux store
            dispatch(setUserDetails(userDetailsForRedux));

            // Store the token in localStorage
            localStorage.setItem('accessToken', data.token);
            
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Set the login cookie
            Cookies.set("edmin_login", "true");
            Cookies.set("accessToken", data.token, { 
              expires: 365, 
              path: '/',
              secure: false,  // Always false
              sameSite: 'strict'
            });

            router.push('/dashboard/default');
            setLoading(false);
        } else {
          setLoading(false);
            showAlert(`Signup failed`, "danger");
        }
    } catch (error) {
        console.error("Signup error:", error);
        setLoading(false);
        showAlert("An error occurred while creating the account.", "danger");
    }
};


  return (
    <div className="login-card login-dark">
      <div>
        <div><CommonLogo alignLogo={alignLogo} /></div>
        <div className="login-main">
          <Form className="theme-form" onSubmit={(event) => {
            event.preventDefault();
            createAccount();
          }}>
            <h2 className="text-center">{CreateYourAccount}</h2>
            <p>{"Enter your personal details to create an account"}</p>
            <FormGroup>
              <Label className="pt-0">{YourName}</Label>
              <Row className="g-2">
                <Col xs="6">
                  <Input type="text" required placeholder={FirstName} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Col>
                <Col xs="6">
                  <Input type="text" required placeholder={LastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label>{EmailAddress}</Label>
              <Input type="email" required placeholder={EmailsPlaceHolder} value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input type="tel" required placeholder="0701234567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>Company Name</Label>
              <Input type="text" required placeholder="Company Inc." value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label>{Password}</Label>
              <div className="form-input position-relative">
                <Input type={showPassWord ? "text" : "password"} placeholder="*********" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="show-hide">
                  <span onClick={() => setShowPassWord(!showPassWord)} className={!showPassWord ? "show" : ""} />
                </div>
              </div>
            </FormGroup>

            {/* Alert Message */}
            {customAlert.message && (
              <Alert color={customAlert.type} className="text-center">
                {customAlert.message}
              </Alert>
            )}

            <FormGroup className="mb-0 checkbox-checked">
              <div className="checkbox-solid-info">
                <Input id="checkbox1" type="checkbox" />
                <Label for="checkbox1">{AgreeWith} <Link className="ms-3" href={`/authentication/forgetpassword`}>{PrivacyPolicy}</Link></Label>
              </div>
              <Button 
                block 
                color="primary" 
                className="w-100 mt-3" 
                disabled={loading}
              >
                {loading ? "Loading..." : CreateAccount}
              </Button>
            </FormGroup>
            <p className="mt-4 mb-0 text-center">{"Already have an account?"}<Link className="ms-2" href={`/auth/login`}>{SignIn}</Link></p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CommonRegisterForm;
