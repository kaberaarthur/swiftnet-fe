import { TabPane } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import InboxEmailContent from "./InboxEmailContent";
import MailPagination from "./MailPagination";

const InboxContent = () => {
  const { page, inboxEmail } = useAppSelector((state) => state.letterBox);
  return (
    <TabPane tabId="1">
      <div className="mail-body-wrapper">
        <ul>
          {inboxEmail.map((data, index) => (
            <li className={`inbox-data ${page ? (index < 7 ? "hidden" : "") : index < 7 ? "" : "hidden"}`} key={index}>
              <InboxEmailContent data={data} index={index} />
            </li>
          ))}
        </ul>
      </div>
      <MailPagination />
    </TabPane>
  );
};

export default InboxContent;
