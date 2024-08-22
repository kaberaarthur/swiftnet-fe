import { TabPane } from "reactstrap";
import { workEmailData } from "@/Data/Application/LetterBox/LetterBox";
import WorkEmailContent from "./WorkEmailContent";

const WorkContent = () => {
  return (
    <TabPane tabId="6" >
      <div className="mail-body-wrapper">
        <ul>
          {workEmailData.map((data,index)=>(
            <li className="inbox-data" key={index}>
              <WorkEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default WorkContent;
