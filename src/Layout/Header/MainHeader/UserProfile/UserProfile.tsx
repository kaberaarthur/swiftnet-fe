"use client"
import { ImagePath } from '@/Constant';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import UserProfileIcons from './UserProfileIcons';

// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { setUserDetails } from '../../../../Redux/Reducers/userSlice';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [show, setShow] = useState(false);
    const router = useRouter();

    /*
    useEffect(() => {
        // Check if accessToken cookie exists or is empty
        const accessToken = Cookies.get("accessToken");
        console.log("Access Token: ", accessToken);
    
        if (accessToken === "x") {
            console.log("Empty Access Token Cookie");
            // Redirect to /auth/login if token is missing or empty
            router.push("/auth/login");
        }
      }, [router]);
      */
    

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
