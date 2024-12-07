import { TabPane } from "reactstrap";
import { draftEmailData } from "@/Data/Application/LetterBox/LetterBox";
import DraftEmailContent from "./DraftEmailContent";

const DraftContent = () => {
  return (
    <TabPane tabId="4" >
      <div className="mail-body-wrapper">
        <ul >
          {draftEmailData.map((data,index)=>(
            <li className="inbox-data" key={index}>
              <DraftEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default DraftContent;
