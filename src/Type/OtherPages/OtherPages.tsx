import { ChangeEvent } from "react";

export interface CountdownDataProp {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

export interface CommonFormPropsType {
  alignLogo?: string;
  validation?: boolean;
}

export interface LoginSubmitProp {
  email: string;
  password: string;
}

export interface PropsType {
  level: number;
}

export interface RegisterWizardForm {
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  formValue: FormValueInterFace;
}

interface FormValueInterFace {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  age: string;
  passPort: string;
}
