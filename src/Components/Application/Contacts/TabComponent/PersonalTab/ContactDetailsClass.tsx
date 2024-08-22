import { useCallback, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import SweetAlert from 'sweetalert2';
import { Delete, Edit, EmailAddress, General, History, Href, ImagePath, MobileNo, Name, Print } from '@/Constant';
import PrintModalPreview from './PrintModalPreview';
import { ContactDetailsPropsType, UserCallbackUser } from '@/Type/Application/Contacts/Contacts';
import { deletedUser, setHistory, setTempId } from '@/Redux/Reducers/ContactSlice';
import { NavLink } from 'reactstrap';
import SearchNotFoundClass from '@/Components/Application/Common/SearchNotFoundClass';
import Image from 'next/image';

const ContactDetailsClass:React.FC<ContactDetailsPropsType> = ({ selectedUser, userEditCallback,setSelectedUser }) => {
  const {users} = useAppSelector((state)=> state.contact)
  const [printModal, setPrintModal] = useState(false);
  const printModalToggle = () => setPrintModal(!printModal);
  const dispatch=useAppDispatch()
  const toggleCallback = useCallback((toggle:boolean) => {
    setPrintModal(toggle);
  }, []);
    
  const editUsers = (usersData:UserCallbackUser) => {
    dispatch(setTempId(usersData.id));
    userEditCallback(true, usersData);
  };

  const deleteUser = (userId:number | undefined) => {
    SweetAlert.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ok',
      cancelButtonText: 'cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        dispatch(deletedUser(userId));
        const newUsers= users.filter((user) => user.id !== userId)
        setSelectedUser(newUsers[newUsers.length - 1])
        SweetAlert.fire('Deleted!','Your file has been deleted.','success');
      } else {
        SweetAlert.fire('Your imaginary file is safe!');
      }
    });
  };
  return (
    <>
      {selectedUser ?
        <div className="profile-mail">
          <div className="d-flex">
            <Image width={100} height={100} className= 'img-100 img-fluid m-r-20 rounded-circle update_img_0' src= {`${ImagePath}/${selectedUser.avatar}`} alt= 'users'  />
            <div className="flex-grow-1 mt-0">
              <h6>
                <span className="first_name_0">{selectedUser.name}</span>
                <span className="last_name_0">{selectedUser.sureName}</span>
              </h6>
              <p className='email_add_0'>{selectedUser.name}{'@gmail.com'}</p>
              <ul >
                <li><a href={Href} className="font-primary" onClick={() => editUsers(selectedUser)}>{Edit}</a></li>
                <li><a href={Href} className="font-primary" onClick={() => deleteUser(selectedUser.id)}>{Delete}</a></li>
                <li><a href={Href} className="font-primary" onClick={()=> dispatch(setHistory())}>{History}</a></li>
                <li><a href={Href} className="font-primary" onClick={() => printModalToggle()}>{Print}</a></li>
              </ul>
            </div>
          </div>
          <div className="email-general">
            <h6 className='mb-3'>{General}</h6>
            <ul>
              <li>{Name}<span className="font-primary first_name_0">{selectedUser.name}</span></li>
              <li>{MobileNo} <span className="font-primary mobile_num_0">{selectedUser.mobile}</span></li>
              <li>{EmailAddress}<span className="font-primary email_add_0">{`${selectedUser.name}@gmail.com`} </span></li>
            </ul>
          </div>
        </div>
        :
        <SearchNotFoundClass word='Contacts' />
      }
      {selectedUser && <PrintModalPreview toggleCallback={toggleCallback} printModal={printModal} selectedUser={selectedUser} />}
    </>
  )
}

export default ContactDetailsClass