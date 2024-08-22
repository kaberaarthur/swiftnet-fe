import { organizationList } from '@/Data/Application/Contacts/Contacts'
import { NavLink, TabPane } from 'reactstrap'
import { Delete, Edit, EmailAddress, Gender, General, History, Href, ImagePath, Name, Personal, Print } from '@/Constant'
import { useState } from 'react'
import PrintModalPreview from './PrintModalPreview'
import { OrganizationTabType } from '@/Type/Application/Contacts/Contacts'
import Image from 'next/image'

const TabOrganization = () => {
  const [printModal, setPrintModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const printModalToggle = (data:OrganizationTabType) => {
    setPrintModal(!printModal)
    setSelectedUser(data)
  }
  return (
    <>
      {organizationList.map((item, i) =>
        <TabPane tabId={item.activeTab} key={i}>
          <div className="profile-mail">
            <div className="d-flex">
              <Image width={100} height={100} className='img-100 img-fluid m-r-20 rounded-circle update_img_5' src= {`${ImagePath}/${item.avatar}`} alt= 'images'  />
              <div className="flex-grow-1 mt-0">
                <h5>
                  <span className="first_name_5">{item.name}</span>
                  <span className="last_name_5">{"jecno"}</span>
                </h5>
                <p className='email_add_5' >{item.email}</p>
                <ul className='flex-row'>
                  <li><NavLink className='font-primary' to={Href} onClick={() => printModalToggle(item)}>{Print}</NavLink></li>
                  <li><NavLink className='font-primary' to={Href}>{Edit}</NavLink></li> 
                  <li><NavLink className='font-primary' to={Href}>{Delete}</NavLink> </li> 
                  <li><NavLink className='font-primary' to={Href}>{History}</NavLink></li>
                </ul>
              </div>
            </div>
            <div className="email-general">
              <h6 className='mb-3'>{General}</h6>
              <ul>
                <li>{Name}<span className="font-primary first_name_2">{item.email}</span></li>
                <li>{Gender}<span className="font-primary first_name_2">{item.gender}</span></li>
                <li>{EmailAddress}<span className="font-primary first_name_2">{item.email}</span></li>
              </ul>
            </div>
          </div>
        </TabPane>
      )}
      {selectedUser && <PrintModalPreview printModal={printModal} setPrintModal={setPrintModal} selectedUser={selectedUser} />}
    </>
  )
}

export default TabOrganization