import React, { LegacyRef } from "react";
import { ImagePath, Send } from "@/Constant";
import InboxOption from "./InboxOption";
import UserFooter from "./UserFooter";
import UserMailBody from "./UserMailBody";
import { MailPropsType } from "@/Type/Application/LetterBox/LetterBox";
import { Button } from "reactstrap";
import Image from "next/image";
import FeatherIcons from "@/Components/Forms/FormsLayout/FormWizardOne/VerticalValidationWizard/FeatherIconCom";

const InterviewMailBody = React.forwardRef(({ handlePrint }: MailPropsType, ref: LegacyRef<HTMLDivElement> | undefined) => {
  return (
    <div ref={ref}>
      <div className="mail-body-wrapper">
        <div className="user-mail-wrapper">
          <div className="user-title">
            <div>
              <div className="rounded-border">
                <Image width={38} height={38} className="img-fluid" src={`${ImagePath}/user/12.jpg`} alt="user" />
              </div>
              <div className="dropdown-subtitle">
                <p>Ronald Richards</p>
                <div className="onhover-dropdown">
                  <Button className="btn p-0 dropdown-button" color="">
                    To me <FeatherIcons iconName="ChevronDown" />
                  </Button>
                  <div className="inbox-security onhover-show-div">
                  <p>From: <span>pixelstrap &lt;pixelstrap3@gmail.com&gt;</span></p>
                  <p>to: <span>donut.horry@gmail.com</span></p>
                  <p>reply-to:<span>&lt;pixelstrap3@gmail.com&gt;</span></p>
                  <p>date: <span>Jun 13, 2023, 7:10 AM</span></p>
                  <p>subject: <span>Important Account Security Update</span></p>
                  <p>security: <span>standard encryption (TLS)</span></p>
                </div>
                </div>
              </div>
            </div>
            <InboxOption handlePrint={handlePrint} />
          </div>
          <UserMailBody />
          <UserFooter />
          <div className="send-btn">
            <Button color="primary">
              {Send}
              <i className="fa fa-paper-plane" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default InterviewMailBody;
