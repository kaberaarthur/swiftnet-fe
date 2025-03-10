import { Dispatch, SetStateAction } from "react";

export interface ContactNavPropsType {
    callbackActive: (val: string) => void;
  }

export interface OrganizationTabType {
  id: string;
  activeTab: string;
  avatar: string;
  name: string;
  email: string;
  gender: string;
}

export interface PrintModalPreviewPropsType {
  printModal : boolean | any;
  setPrintModal: (val: boolean) => void;
  selectedUser: UserCallbackUser
}

export interface ContactSliceType {
    users: [] | ContactUsersType[];
    contactFilter: boolean;
    contactValidation: boolean;
    modal: boolean;
    categoryModal: boolean;
    tempId: number;
    history: boolean;
}

  export interface ContactUsersType {
    id: number;
    avatar: string;
    name: string;
    sureName: string;
    email: string;
    mobile: string;
  }
  
  export interface ContactSidebarCallbackProp {
    callback: (tab: string) => void
  }
  
  export interface ContactNavProps {
    activeTab: string;
  }
  
  export interface PersonalTabPropsType {
    users: [] | ContactUsersType[];
  }
  
  export interface UserCallbackUser {
    id?: number;
    name?: string;
    sureName?: string;
    mobile?: string;
    avatar?: string;
    email?: string;
  }
  
  export interface UserUpdateType {
    name: string;
    sureName: string;
    email: string;
    mobile: string;
  }
  
  export interface ListNewContactPropsType{
    users:[] | ContactUsersType[], 
    userCallback: (user: UserCallbackUser) => void
  }
  
  export interface UpdateUserPropsType{
    editData:UserCallbackUser
    userEditCallback:(edit: boolean, usersData: UserCallbackUser)=>void,
  }
  
  export interface ContactDetailsPropsType {
    selectedUser: UserCallbackUser;
    userEditCallback: (edit: boolean, usersData: UserCallbackUser) => void;
    setSelectedUser:Dispatch<SetStateAction<UserCallbackUser | UserUpdateType | undefined>>
  }
  
  export interface PrintModalPropsTypes {
    printModal: boolean;
    selectedUser: UserCallbackUser;
    toggleCallback: (result: boolean) => void;
  }
  
  export  interface PrintPreviewPropsType{
    selectedUser:UserCallbackUser
  }
  
  export interface NavOrgPropType {
    callback: (tab:string)=>void;
  }
  
  export interface NoDataFoundPropsType {
    title: string;
  }