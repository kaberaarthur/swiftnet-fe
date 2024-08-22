import { useState } from 'react'
import { organizationList } from '@/Data/Application/Contacts/Contacts';
import { Col, Nav, NavItem, NavLink } from 'reactstrap';
import { Href, ImagePath } from '@/Constant';
import { NavOrgPropType } from '@/Type/Application/Contacts/Contacts';
import Image from 'next/image';

const NavOrganization:React.FC<NavOrgPropType> = ({ callback }) => {
  const [organizationTab, setOrganizationTab] = useState("1");
  const handleTabs = (tab: string) => {
    setOrganizationTab(tab);
    callback(tab);
  };
  return (
    <Col xl="4" md="5" className="xl-50">
      <Nav pills className="flex-column">
        {organizationList.map((item) => (
          <NavItem id="myTab" key={item.id}>
            <NavLink href={Href} className={organizationTab === item.activeTab ? "active" : ""} onClick={() => handleTabs(item.activeTab)}>
              <div className="d-flex">
                <Image width={50} height={50} className="p-0 img-50 img-fluid m-r-20 rounded-circle" src={`${ImagePath}/${item.avatar}`} alt="Image" />
                <div className="flex-grow-1">
                  <h6>{item.name}</h6>
                  <p>{item.email}</p>
                </div>
              </div>
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Col>
  )
}

export default NavOrganization