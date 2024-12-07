import { Nav, NavItem, NavLink } from 'reactstrap';
import { businessVerticalData } from '@/Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo';
import { Href } from '@/Constant';
import { BusinessFormCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const NavComponent:React.FC<BusinessFormCommonProps> = ({ callbackActive, activeTab }) => {
  const handleTab = (id: number | undefined) => {
    if (id !== undefined) callbackActive(id);
  };

  return (
    <Nav pills className="horizontal-options">
      {businessVerticalData.map((data, index) => (
        <NavItem key={index}>
          <NavLink className={`${activeTab === index + 1 ? "active" : ""}`} onClick={() => handleTab(data.activeTab)} href={Href}>
            <div className="horizontal-wizard">
              <div className="stroke-icon-wizard">
                <span>{index + 1}</span>
              </div>
              <div className="horizontal-wizard-content business-wizard">
                <h6>{data.tittle}</h6>
              </div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavComponent