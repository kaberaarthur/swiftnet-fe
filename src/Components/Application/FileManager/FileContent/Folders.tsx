import { Folder } from "@/Constant";
import { FileProps } from "@/Type/Application/FileSideBar/FileSideBar";
import { Fragment } from "react";

const Folders: React.FC<FileProps> = ({ myFiles }) => {
  return (
    <>
      <h5 className="mt-4 mb-2">{Folder}</h5>
      <ul className="folder">
        {myFiles.map((item, index) => (
          <Fragment key={index}>
            {item.title && (
              <li className="folder-box " key={index}>
                <div className="d-block">
                  <i className={item.folderClass}></i>
                  <i className="fa fa-ellipsis-v me-0 f-14 ellips"></i>
                  <div className="mt-3">
                    <h6 className="mb-2">{item.title}</h6>
                    <p>
                      {item.folderSize}
                      <span className="pull-right">
                        <i className="fa fa-clock-o"></i>
                        {item.modify}
                      </span>
                    </p>
                  </div>
                </div>
              </li>
            )}
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default Folders;
