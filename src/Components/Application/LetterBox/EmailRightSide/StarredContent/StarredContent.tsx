import { useAppSelector } from "@/Redux/Hooks";
import StarredEmailContent from "./StarredEmailContent";
import { Fragment } from "react";
import { TabPane } from "reactstrap";

const StarredContent = () => {
  const { inboxEmail } = useAppSelector((state) => state.letterBox);
  return (
    <TabPane tabId="3">
      <div className="mail-body-wrapper">
        <ul>
          {inboxEmail.length > 0
            ? inboxEmail.map((data, index) => (
                <Fragment key={index}>
                  {data.star && (
                    <li className="inbox-data">
                      <StarredEmailContent data={data} index={index} />
                    </li>
                  )}
                </Fragment>
              ))
            : "NO Starred Data"}
        </ul>
      </div>
    </TabPane>
  );
};

export default StarredContent;
