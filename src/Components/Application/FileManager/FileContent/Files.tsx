import { FileProps } from "@/Type/Application/FileSideBar/FileSideBar";
import { File } from "@/Constant";

const Files: React.FC<FileProps> = ({ myFiles }) => {
  return (
    <>
      <h5 className="mt-4 mb-2">{File} </h5>
      <ul className="d-flex files-content ">
        {myFiles.map((data, i) => (
          <li className="folder-box" key={i}>
            <div className="d-flex align-items-center files-list">
              <div className="flex-shrink-0 file-left">
                <i className={data.icon} />
              </div>
              <div className="flex-grow-1 ms-3">
                <h6 className="mb-2">{data.name}</h6>
                <p>{data.modify + data.size}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Files;
