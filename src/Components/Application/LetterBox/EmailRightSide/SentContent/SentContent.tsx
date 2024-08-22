import { TabPane } from "reactstrap";
import { sentEmailData } from "@/Data/Application/LetterBox/LetterBox";
import SentEmailContent from "./SentEmailContent";

const SentContent = () => {
  return (
    <TabPane tabId="2">
      <div className="mail-body-wrapper">
        <ul>
          {sentEmailData.map((data,index)=>(
            <li className="inbox-data" key={index}>
              <SentEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default SentContent;
