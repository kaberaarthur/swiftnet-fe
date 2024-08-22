import React from "react";
import { Col } from "reactstrap";
import SearchInput from "./SearchInput";
import DarkMode from "./DarkMode/DarkMode";
import ResponsiveSearch from "../ResponsiveSearch";
import ZoomInOut from "./ZoomInOut/ZoomInOut";
import NotificationHeader from "./NotificationHeader/NotificationHeader";
import CartHeader from "./CartHeader/CartHeader";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import UserProfile from "./UserProfile/UserProfile";
import { BookMark } from "./BookmarkHeader";
import Language from "./Language/Language";

const MainHeader = () => {
  return (
    <Col className="page-main-header">
      <SearchInput />
      <div className="nav-right">
        <ul className="header-right">
          <DarkMode />
          <ResponsiveSearch />
          <ZoomInOut />
          <Language />
          <NotificationHeader />
          <BookMark />
          <CartHeader />
          <MessagesHeader />
          <UserProfile />
        </ul>
      </div>
    </Col>
  );
};

export default MainHeader;
