import { Nav, NavItem, NavLink } from 'reactstrap'
import { customHorizontalData } from '@/Data/Forms/FormsLayout/FormsWizardTwo/FormsWizardTwo';
import { Href } from '@/Constant';
import { BusinessFormCommonProps } from '@/Type/Forms/FormsLayout/FormsLayout';

const NavComponent :React.FC<BusinessFormCommonProps> = ({callbackActive,activeTab}) => {
  const handleTab = (id: number | undefined) => {
    if (id !== undefined) {
      callbackActive(id);
    }
  };
  return (
    <Nav className="nav-pills horizontal-options" id="horizontal-wizard-tab">
      {customHorizontalData.map((data, index) => (
        <NavItem key={index} >
          <NavLink
            className={`${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => handleTab(data.activeTab)}
            href={Href}>
            <div className="horizontal-wizard">
              <div className="stroke-icon-wizard">
                <i className={`fa ${data.iconName}`} />
              </div>
              <div className="horizontal-wizard-content">
                <h6>{data.tittle}</h6>
              </div>
            </div>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  )
}

export default NavComponent