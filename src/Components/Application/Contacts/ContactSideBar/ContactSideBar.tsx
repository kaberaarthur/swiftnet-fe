import { Button, Card, CardBody } from 'reactstrap'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { ContactFilter, ImagePath } from '@/Constant';
import NavComponent from './NavComponent';
import { ContactSidebarCallbackProp } from '@/Type/Application/Contacts/Contacts';
import { setContactFilter } from '@/Redux/Reducers/ContactSlice';
import Image from 'next/image';

const ContactSideBar:React.FC<ContactSidebarCallbackProp> = ({ callback }) => {
  const { contactFilter } = useAppSelector((state) => state.contact);
  const dispatch = useAppDispatch();
  return (
    <div className="md-sidebar">
      <Button color="primary" className="md-sidebar-toggle" onClick={() => dispatch(setContactFilter())}>
        {ContactFilter}
      </Button>
      <div className={`md-sidebar-aside custom-scrollbar ${contactFilter ? "open" : ""}`} >
        <div className="email-left-aside">
          <Card>
            <CardBody className="custom-scrollbar">
              <div className="email-app-sidebar left-bookmark">
                <div className="d-flex flex-wrap">
                  <div className="media-size-email">
                    <Image width={38} height={38} className="me-2 rounded-circle" src={`${ImagePath}/user/4.jpg`} alt="users"/>
                  </div>
                  <div className="flex-grow-1">
                    <h3 className='f-w-600 f-16'>{'MARK JENCO'}</h3>
                    <p>{'Markjecno@gmail.com'}</p>
                  </div>
                </div>
                <NavComponent callbackActive={callback} />
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactSideBar