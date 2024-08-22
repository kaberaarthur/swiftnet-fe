import { Nav, NavItem, NavLink } from 'reactstrap'
import { verticalWizardTabData } from '@/Data/Forms/FormsLayout/FormWizardOne/FormWizardOne'
import { Href } from '@/Constant'
import { VerticalFormPropsType } from '@/Type/Forms/FormsLayout/FormsLayout'

const NavComponent:React.FC<VerticalFormPropsType> = ({ callbackActive,activeTab }) => {
  return (
    <Nav className="flex-column header-vertical-wizard">
      {verticalWizardTabData.map((data, index) => (
        <NavItem key={index}>
          <NavLink className={activeTab === index+1 ? "active" : ""} onClick={() => {callbackActive(index + 1)}} href={Href}>
            <div className="vertical-wizard">
              <div className="stroke-icon-wizard">
                <i className={`fa ${data.iconClassName}`} />
              </div>
              <div className="vertical-wizard-content">
                <h6>{data.tittle}</h6>
                <p>{data.tittleInforMation}</p>
              </div>
            </div>
          </NavLink>
      </NavItem>
      ))}
    </Nav>
  )
}

export default NavComponent