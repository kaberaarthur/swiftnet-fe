'use client'
import { useSelector} from 'react-redux';
import { RootState } from '../../../../Redux/Store'

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>User Type: {user.user_type}</p>
      <p>Company Username: {user.company_username}</p>
    </div>
  );
};

export default UserProfile;
