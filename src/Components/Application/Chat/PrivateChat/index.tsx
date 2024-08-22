"use client";
import { useAppDispatch } from "@/Redux/Hooks";
import { fetchChatApiData, fetchChatMemberApiData } from "@/Redux/Reducers/ChatSlice";
import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { LeftSideBar } from "./LeftSideBar";
import UserChat from "./UserChat";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { Chat, PrivateChat } from "@/Constant";

const PrivateChatContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchChatMemberApiData());
    dispatch(fetchChatApiData());
  }, []);

  return (
    <>
      <Breadcrumbs mainTitle={PrivateChat} parent={Chat} />
      <Container fluid>
        <Row className="g-0">
          <LeftSideBar />
          <UserChat />
        </Row>
      </Container>
    </>
  );
};

export default PrivateChatContainer;
