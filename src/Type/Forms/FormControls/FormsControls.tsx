import { FormikErrors } from "formik";

export interface VariationRadioProp {
  id: number;
  labelText: string;
  image?: string;
  icon?: string;
  name?: string;
  defaultChecked?: boolean;
  iconColor?: string;
}

export interface CommonCardFooterProp {
  footerClass?: string;
  color1: string;
  btn2Class?: string;
  btn1Class?: string;
  color2: string;
}

interface StarProp {
  id: number;
  starClass?: string;
}

export interface VerticalStyleFormProp {
  id: number;
  color: string;
  cardClass?: string;
  name?: string;
  badgeTitle: string;
  mediaBodyClass?: string;
  digits: string;
  spanText: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProp[];
}

export interface HorizontalStyleFormProp {
  id: number;
  color: string;
  name: string;
  mediaBodyClass?: string;
  badgeTitle: string;
  digits: string;
  spanText: string;
  colClass?: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProp[];
  cardClass?: string;
}

export interface TooltipValidationProp {
  firstname: string;
  lastname: string;
  username: string;
  city: string;
  state: string;
  zip: string;
}

export interface TooltipFormValidationProp {
  submitErrors: boolean;
  setSubmitError: (key: boolean) => void;
  errors: FormikErrors<TooltipValidationProp>;
}

export interface FormValidationProp {
  firstname: string;
  password: string;
  state: string;
  city: string;
  zip: string;
  payment: string;
  theme: string;
  file: string;
  description: string;
  terms: [];
}

export interface FormValidationsProp {
  submitErrors: boolean;
  setSubmitError: (key:boolean)=>void
  errors: FormikErrors<FormValidationProp>;
}
export  interface ButtonDropdownListProp {
  color: string;
  title?: string;
  options: string[];
  outline?: boolean;
  divider: boolean;
}
export interface CustomFormSelectProp {
  inputId: string;
  options: string[];
  title: string;
}
export interface TooltipValidationProp {
  firstname: string;
  lastname: string;
  username: string;
  city: string;
  state: string;
  zip: string;
}

export interface FormValidationProp {
  firstname: string;
  password: string;
  state: string;
  city: string;
  zip: string;
  payment: string;
  theme: string;
  file: string;
  description: string;
  terms: [];
}