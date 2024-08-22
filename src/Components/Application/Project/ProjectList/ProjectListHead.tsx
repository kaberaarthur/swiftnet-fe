import { Card, Col, Nav, NavItem, NavLink, Row } from 'reactstrap'
import { All, Doing, Done, Href } from '@/Constant'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks'
import CreateNewProject from './CreateNewProject'
import SvgIcon from '@/CommonComponent/SVG/SvgIcon'
import { setActiveTab } from '@/Redux/Reducers/ProjectSlice'

const ProjectListHead = () => {
  const {activeTab} = useAppSelector((state)=>state.project)
  const dispatch = useAppDispatch()
  return (
    <Card>
      <Row>
        <Col md="6">
          <Nav tabs className="border-tab">
            <NavItem>
              <NavLink className={activeTab === "1" ? "active" : ""} onClick={() => dispatch(setActiveTab("1"))} href={Href}>
                <SvgIcon className='feather' iconId='target' /> {All}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "2" ? "active" : ""} onClick={() => dispatch(setActiveTab("2"))} href={Href}>
                <SvgIcon className='feather' iconId='info' /> {Doing}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "3" ? "active" : ""} onClick={() => dispatch(setActiveTab("3"))} href={Href}> 
                <SvgIcon className='feather' iconId='check-circle' /> {Done}
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
        <CreateNewProject />
      </Row>
    </Card>
  )
}

export default ProjectListHead