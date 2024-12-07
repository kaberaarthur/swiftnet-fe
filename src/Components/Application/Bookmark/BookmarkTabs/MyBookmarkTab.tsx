import { Card, CardBody, CardHeader, TabPane } from "reactstrap";
import DataLoop from "./DataLoop";
import { MyBookmark } from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import ViewBookmark from "../Common/ViewBookmarks";

const MyBookmarkTab = () => {
  const { gridView } = useAppSelector((state) => state.bookmarkTab);
  return (
    <TabPane tabId="4">
      <Card className="mb-0">
        <CardHeader className="d-flex">
          <h4 className="mb-0">{MyBookmark}</h4>
          <ViewBookmark />
        </CardHeader>
        <CardBody>
          <div className={`details-bookmark text-center ${gridView ? "" : "list-bookmark"}`}>
            <DataLoop />
          </div>
        </CardBody>
      </Card>
    </TabPane>
  );
};

export default MyBookmarkTab;
