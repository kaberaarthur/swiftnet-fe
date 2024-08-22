import { Href, Personal, Views } from '@/Constant';
import { sideBarData } from '@/Data/Application/Contacts/Contacts';
import { ContactNavPropsType } from '@/Type/Application/Contacts/Contacts';
import { useState } from 'react';
import { Nav, NavItem } from 'reactstrap';
import CategoryCreate from './CategoryCreate';
import CreateContact from './CreateContact';

const NavComponent:React.FC<ContactNavPropsType> = ({ callbackActive }) => {
  const [activeTab, setActiveTab] = useState("1");
  const activeTabHandler=(value:string)=>{
    setActiveTab(value)
    callbackActive(value)
  }
  return (
    <Nav className="main-menu contact-options">
      <NavItem>
        <CreateContact />
      </NavItem>
      <NavItem>
        <span className="main-title">{Views}</span>
      </NavItem>
      <NavItem>
        <a href={Href} className={activeTab === "1" ? "active" : ""} onClick={() => { setActiveTab("1"); callbackActive("1");}}>
          <span className="title">{Personal}</span>
        </a>
      </NavItem>
      <NavItem>
        <CategoryCreate />
      </NavItem>
      {sideBarData.map((data, index) => (
        <NavItem key={index}>
          <a href={Href} className={activeTab === data.value ? "active" : ""} onClick={() => activeTabHandler(data.value)}>
            <span className="title">{data.tittle}</span>
          </a>
        </NavItem>
      ))}
    </Nav>
  )
}

export default NavComponent