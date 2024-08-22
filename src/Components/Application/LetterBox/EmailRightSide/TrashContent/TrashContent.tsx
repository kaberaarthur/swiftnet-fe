import { TabPane } from "reactstrap";
import { trashEmailData } from "@/Data/Application/LetterBox/LetterBox";
import TrashEmailContent from "./TrashEmailContent";

const TrashContent = () => {
  return (
    <TabPane tabId="5">
      <div className="mail-body-wrapper">
        <ul >
          {trashEmailData.map((data,index)=>(
            <li className="inbox-data" key={index}>
              <TrashEmailContent data={data} index={index}/> 
            </li>
          ))}
        </ul>
      </div>
    </TabPane>
  );
};

export default TrashContent;
