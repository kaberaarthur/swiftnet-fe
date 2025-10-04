"use client"
import { ImagePath } from '@/Constant';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import UserProfileIcons from './UserProfileIcons';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'


// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { setUserDetails } from '../../../../Redux/Reducers/userSlice';

const UserProfile = () => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);
    const [show, setShow] = useState(false);
    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
    const localUser = localStorage.getItem("user");
    let userObject;

    const dispatch = useDispatch();

    useEffect(() => {

        if (localUser !== null) {
            userObject = JSON.parse(localUser);

            // Format data for Redux dispatch
            const userDetailsForRedux = {
                ...userObject,
                usertoken: accessToken
            };

            dispatch(setUserDetails(userDetailsForRedux));

        } else {
            userObject = null;
            router.push(`/auth/login`);
        }
    }, [localUser]);
    

    // Utility function to capitalize the first letter of a string
    const capitalizeFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    return (
        <li className="profile-dropdown custom-dropdown">
            <div className="d-flex align-items-center" onClick={() => setShow(!show)}>
                <Image width={45} height={49} src={`${ImagePath}/avatar.jpg`} alt="avatar" />
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
