import { useAppSelector } from "@/Redux/Hooks";
import { LetterBoxNavContentType } from "@/Type/Application/LetterBox/LetterBox";
import { Card, Col, TabContent } from "reactstrap";
import AddLabelModal from "./AddLabelModal/AddLabelModal";
import ComposeEmailModal from "./ComposeEmailModal/ComposeEmailModal";
import DraftContent from "./DraftContent/DraftContent";
import EmailHeader from "./EmailHeader/EmailHeader";
import InboxContent from "./InboxContent/InboxContent";
import InterviewMail from "./InterviewMail/InterviewMail";
import PrivateContent from "./PrivateContent/PrivateContent";
import SentContent from "./SentContent/SentContent";
import StarredContent from "./StarredContent/StarredContent";
import SupportContent from "./SupportContent/SupportContent";
import TrashContent from "./TrashContent/TrashContent";
import WorkContent from "./WorkContent/WorkContent";

const EmailRightSide: React.FC<LetterBoxNavContentType> = ({ navId }) => {
  const { interviewEmail } = useAppSelector((state) => state.letterBox);
  return (
    <Col xxl="9" xl="8" className="box-col-12">
      <div className="email-right-aside">
        <Card className={`email-body email-list ${interviewEmail ? "hide" : "show"}`}>
          <ComposeEmailModal />
          <EmailHeader />
          <TabContent id="email-pills-tabContent" activeTab={navId}>
            <InboxContent />
            <SentContent />
            <StarredContent />
            <DraftContent />
            <TrashContent />
            <WorkContent />
            <PrivateContent />
            <SupportContent />
            <AddLabelModal />
          </TabContent>
        </Card>
        <InterviewMail />
      </div>
    </Col>
  );
};

export default EmailRightSide;
