import { supportEmailData } from "@/Data/Application/LetterBox/LetterBox";
import UserEmailContent from "./UserEmailContent";
import { TabPane } from "reactstrap";

const SupportContent = () => {
  return (
    <TabPane tabId="8" >
      <div className="mail-body-wrapper">
        <ul>
          {supportEmailData.map((data, index) => (
            <li className="inbox-data" key={index}>
              <UserEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default SupportContent;
