import { privateEmailData } from "@/Data/Application/LetterBox/LetterBox";
import PrivateEmailContent from "./PrivateEmailContent";
import { TabPane } from "reactstrap";

const PrivateContent = () => {
  return (
    <TabPane tabId="7">
      <div className="mail-body-wrapper">
        <ul >
          {privateEmailData.map((data,index)=>(
            <li className="inbox-data" key={index}>
              <PrivateEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default PrivateContent;
