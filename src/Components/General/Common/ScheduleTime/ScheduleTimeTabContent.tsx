import { TabContent, TabPane } from "reactstrap";
import { ScheduleTimeTabContentPropsType } from "@/Type/General/Dashboard/DefaultType";
import { scheduleTimeTabContent } from "@/Data/General/Dashboard/Default/Default";
import Image from "next/image";
import { ImagePath } from "@/Constant";

const ScheduleTimeTabContent: React.FC<ScheduleTimeTabContentPropsType> = ({ tabId }) => {
  return (
    <TabContent id="myTabContent" activeTab={tabId}>
      {scheduleTimeTabContent.map((item, i) => (
        <TabPane tabId={item.id} key={i}>
          <ul className="activity-update">
            {item.TabContentData.map((data, i) => (
              <li className={`d-flex p-0 align-items-center b-l-${data.color}`} key={i}>
                <div className="flex-grow-1">
                  <span>{data.time}</span>
                  <h5>{data.title}</h5>
                  <h6>{data.comment}</h6>
                </div>
                <div className="flex-shrink-0">
                  <Image width={40} height={40} className="img-40 b-r-10" src={`${ImagePath}/avatar/${data.image}`} alt="avatar" />
                </div>
              </li>
            ))}
          </ul>
        </TabPane>
      ))}
    </TabContent>
  );
};

export default ScheduleTimeTabContent;
