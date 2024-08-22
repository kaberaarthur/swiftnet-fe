import { ImagePath } from '@/Constant';
import Image from 'next/image';
import React, { useState } from 'react'
import UserProfileIcons from './UserProfileIcons';

const UserProfile = () => {
    const [show,setShow] =  useState(false)
    return (
      <li className="profile-dropdown custom-dropdown">
        <div className="d-flex align-items-center" onClick={()=>setShow(!show)}>
          <Image width={45} height={49} src={`${ImagePath}/profile.png`} alt="avatar" />
          <div className="flex-grow-1">
            <h5>Wade Warren</h5>
            <span>UI Designer</span>
          </div>
        </div>
        <div className={`custom-menu overflow-hidden ${show? "show" : ""}`}>
          <UserProfileIcons />
        </div>
      </li>
    );
}

export default UserProfile