import { CardBody } from "reactstrap";
import { QuickAccessTitle } from "@/Constant";
import { quickAccessData } from "@/Data/Application/FileSideBar/FileSideBar";
import { DataType } from "@/Type/Application/FileSideBar/FileSideBar";
import Folders from "./Folders";
import Files from "./Files";

const FileContentBody: React.FC<DataType> = ({ myFile, searchTerm }) => {
  return (
    <CardBody className="file-manager">
      {!searchTerm && (
        <>
          <h5 className="mb-2">{QuickAccessTitle} </h5>
          <ul className="quick-file d-flex">
            {quickAccessData.map((data, index) => (
              <li key={index}>
                <div className="quick-box">
                  <i className={`fa fa-${data.icons} font-${data.color}`} />
                </div>
                <h6 className="mb-2">{data.title}</h6>
              </li>
            ))}
          </ul>
          <Folders myFiles={myFile} />
        </>
      )}
      <Files myFiles={myFile} />
    </CardBody>
  );
};

export default FileContentBody;
