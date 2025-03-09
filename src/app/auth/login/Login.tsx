import { CreateAccount, DoNotAccount, EmailAddress, ForgotPassword, Href, ImagePath, Password, RememberPassword, SignIn, SignInAccount, SignInWith } from "@/Constant";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";
import SocialApp from "./SocialApp";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import axios from 'axios';

// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../Redux/Store';
import { setUserDetails } from '../../../Redux/Reducers/userSlice';

import config from "../../../app/(MainBody)/config/config.json";


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
interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  const SimpleLoginHandle = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Send login request to the API
      const response = await axios.post<LoginResponse>(
        `${config.baseUrl}/api/signin`,
        { email, password }
      );

      // Store the token in localStorage
      localStorage.setItem('accessToken', response.data.token);
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Format data for Redux dispatch
      const userDetailsForRedux = {
        ...response.data.user,
        usertoken: response.data.token
      };
      
      // Dispatch user details to Redux store
      dispatch(setUserDetails(userDetailsForRedux));

      // Set the login cookie
      Cookies.set("edmin_login", "true");
      Cookies.set("accessToken", response.data.token, { 
        expires: 365, 
        path: '/',
        secure: false,  // Always false
        sameSite: 'strict'
      });
      
      
      // Show success message
      setSuccess(response.data.message);
      
      // Clear the success message after 2 seconds and redirect
      setTimeout(() => {
        setSuccess(null);
        router.push('/dashboard/default'); // Redirect to dashboard or appropriate page
      }, 2000);
      
    } catch (err) {
      // Handle error response
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      
      // Clear the error message after 2 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <div>
        <Link className="logo text-center" href={Href}>
          <img className="img-fluid" src={imageOne.src} alt="logo" />
        </Link>
      </div>
      <div className="login-main">
        {success && <Alert color="success">{success}</Alert>}
        {error && <Alert color="danger">{error}</Alert>}
        
        <Form className="theme-form" onSubmit={(e) => SimpleLoginHandle(e)}>
          <h2 className="text-center">{SignInAccount}</h2>
          <p className="text-center">{"Enter your email & password to login"}</p>
          <FormGroup>
            <Label className="col-form-label">{EmailAddress}</Label>
            <Input type="email" required placeholder="john@gmail.com" value={email} name="email" onChange={(event) => setEmail(event.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="form-input position-relative">
              <Input type={show ? "text" : "password"} placeholder="*********" onChange={(event) => setPassword(event.target.value)} value={password} name="password" />
              <div className="show-hide" onClick={() => setShow(!show)}>
                <span className="show"> </span>
              </div>
            </div>
          </FormGroup>
          <FormGroup className="mb-0 checkbox-checked">
            <div className="form-check checkbox-solid-info">
              <Input id="checkbox1" type="checkbox" />
              <Label className="text-muted" htmlFor="checkbox1">
                {RememberPassword}
              </Label>
              <Link href={`/authentication/forgetpassword`}> {ForgotPassword}</Link>
            </div>
            <div className="text-end mt-3">
              <Button color="primary" block className="w-100" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

// Hook to get the current user
export const useUser = (): User | null => {
  const [user, setUser] = useState<User | null>(null);
  
  useState(() => {
    // Check for user in localStorage when component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        setUser(parsedUser);
      } catch (e) {
        // Handle parsing error
        console.error('Failed to parse user data');
        localStorage.removeItem('user');
      }
    }
  });
  
  return user;
};

// Helper function to logout
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export default Login;