import SVG from "@/CommonComponent/SVG";
import { userProfilesData } from "@/Data/Layout/HeaderData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Href, Logout } from "@/Constant";
import { LogOut } from "react-feather";

// Redux Store
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { clearUserDetails } from '../../../../Redux/Reducers/userSlice';

const UserProfileIcons = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleClick = () => {
    Cookies.remove("edmin_login");
    Cookies.remove("accessToken");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');

    // Dispatch the action to clear user details
    dispatch(clearUserDetails());

    router.push(`/auth/login`);
  };
  return (
    <ul>
      {/*userProfilesData.map((item, i) => (
        <li className="d-flex" key={i}>
          <SVG className="svg-color" iconId={item.icon} />
          <Link className="ms-2" href={item.link} >
            {item.title}
          </Link>
        </li>
      ))*/}
       <li onClick={handleClick} className="d-flex"><Link href={Href}scroll={false} ><LogOut /><span className="ms-2">{Logout} </span></Link></li>
    </ul>
  );
};

export default UserProfileIcons;
