'use client'
import React, { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { LeftSideBar } from "../PrivateChat/LeftSideBar";
import UserGroupChat from "./UserGroupChat";
import { fetchChatApiData, fetchChatMemberApiData } from "@/Redux/Reducers/ChatSlice";
import { useAppDispatch } from "@/Redux/Hooks";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Chat, GroupChat } from "@/Constant";

const GroupChatContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChatMemberApiData());
    dispatch(fetchChatApiData());
  }, []);

  return (
    <>
      <Breadcrumbs mainTitle={GroupChat} parent={Chat} />
      <Container fluid>
        <Row className="g-0">
          <LeftSideBar />
          <UserGroupChat />
        </Row>
      </Container>
    </>
  );
};

export default GroupChatContainer;
