import { Col, Nav, NavLink } from 'reactstrap';
import { useState } from 'react';
import { ListNewContactPropsType, UserCallbackUser } from '@/Type/Application/Contacts/Contacts';
import { Href, ImagePath } from '@/Constant';
import Image from 'next/image';
import SearchNotFoundClass from '@/Components/Application/Common/SearchNotFoundClass';

const ListNewContact:React.FC<ListNewContactPropsType> = ({ users, userCallback }) => {
  const [dynamicTab, setDynamicTab] = useState(0);
  const ContactDetails = (user:UserCallbackUser) => {
    userCallback({ id: user.id, name: user.name, sureName: user.sureName, avatar: user.avatar, mobile: user.mobile });
  };
  return (
    <Col xl="4" md="5" className='xl-50'>
      <Nav className="flex-column nav-pills">
        {users.length > 0 ?
          users.map((user:UserCallbackUser, index:number) => {
            return (
              <NavLink className={dynamicTab === index ? 'active' : ''} onClick={() => setDynamicTab(index)} key={index} href={Href}>
                <div className="d-flex" onClick={() => ContactDetails(user)}>
                  <Image width={50} height={50} className='img-50 img-fluid m-r-20 rounded-circle update_img_0' src={`${ImagePath}/user/4.jpg`} alt= 'userImage'  />
                  <div className="flex-grow-1">
                    <h6>
                      <span className="first_name_0">{user.name}</span>
                      <span className="last_name_0">{user.sureName}</span>
                    </h6>
                    <p className= 'email_add_0' >{user.name}{'@gmail.com'}</p>
                  </div>
                </div>
              </NavLink>
            );
          })
          :
          <SearchNotFoundClass word='Contact' />
        }
      </Nav>
    </Col>
  )
}

export default ListNewContact