import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import { useTour } from '@reactour/tour'
import UserProfileFirstStyle from "./UserProfileFirstStyle/UserProfileFirstStyle";
import UserProfileSecondStyle from "./UserProfileSecondStyle/UserProfileSecondStyle";
import UserProfileThirdStyle from "./UserProfileThirdStyle/UserProfileThirdStyle";
import UserProfileFourthStyle from "./UserProfileFourthStyle/UserProfileFourthStyle";
import UserProfileFifthStyle from "./UserProfileFifthStyle/UserProfileFifthStyle";
import { BonusUi, Tour } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const TourMain = () => {
  const { setIsOpen } = useTour();
  useEffect(() => {
    var timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <Breadcrumbs mainTitle={Tour} parent={BonusUi} />
      <Container fluid className="user-profile">
        <Row>
          <UserProfileFirstStyle />
          <UserProfileSecondStyle />
          <UserProfileThirdStyle />
          <UserProfileFourthStyle />
          <UserProfileFifthStyle />
        </Row>
      </Container>
    </>
  );
};

export default TourMain;
