import { ImagePath } from '@/Constant';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import UserProfileIcons from './UserProfileIcons';

// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { setUserDetails } from '../../../../Redux/Reducers/userSlice';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [show, setShow] = useState(false);

    // Function to update user details
    const updateUser = () => {
        dispatch(setUserDetails({
            id: 9004,
            name: 'Kamau Njoroge',
            email: 'kamau@swiftnet.com',
            phone: '254722455289',
            user_type: 'admin',
            company_id: 2,
            company_username: '@kijaniinternet',
            usertoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTAwNCwiaWF0IjoxNzI2NTIyMjczLCJleHAiOjE3NTgwNTgyNzN9.a_i9KdoqFcEVzDSe-frQRBiDJ_cwB8O7l_-wtEskWbQ'
        }));
    };

    // useEffect to update user when component mounts or some dependency changes
    useEffect(() => {
        // Call updateUser when the component is mounted
        updateUser();
    }, []); 

    // Utility function to capitalize the first letter of a string
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <li className="profile-dropdown custom-dropdown">
            <div className="d-flex align-items-center" onClick={() => setShow(!show)}>
                <Image width={45} height={49} src={`${ImagePath}/profile.png`} alt="avatar" />
                <div className="flex-grow-1">
                    <h5>{user.name || 'Admin'}</h5>
                    <span>{user.user_type ? capitalizeFirstLetter(user.user_type) : 'Admin'}</span>
                </div>
            </div>
            <div className={`custom-menu overflow-hidden ${show ? 'show' : ''}`}>
                <UserProfileIcons />
            </div>
        </li>
    );
};

export default UserProfile;
