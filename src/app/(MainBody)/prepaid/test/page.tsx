'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store'
import { setUserDetails, clearUserDetails } from '../../../../Redux/Reducers/userSlice';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const updateUser = () => {
    dispatch(setUserDetails({
      id: 1,
      name: 'Kamau Njoroge',
      email: 'kamau@swiftnet.com',
      phone: '254722455289',
      user_type: 'admin',
      company_id: 2,
      company_username: '@kijaniinternet',
      usertoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwNCwiaWF0IjoxNzI2NTIyMjczLCJleHAiOjE3NTgwNTgyNzN9.a_i9KdoqFcEVzDSe-frQRBiDJ_cwB8O7l_-wtEskWbQ'
    }));
  };

  const clearUser = () => {
    dispatch(clearUserDetails());
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>User Type: {user.user_type}</p>
      <p>Company Username: {user.company_username}</p>

      <button onClick={updateUser}>Update User</button>
      <button onClick={clearUser}>Clear User</button>
    </div>
  );
};

export default UserProfile;
