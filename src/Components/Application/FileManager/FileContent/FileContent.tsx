import { ChangeEvent, useState } from "react";
import { filesData } from "@/Data/Application/FileSideBar/FileSideBar";
import { Button, Card, CardHeader, Form, Input } from "reactstrap";
import { AddNew, Upload } from "@/Constant";
import SearchBar from "./SearchBar";
import convertSize from "convert-size";
import FileContentBody from "./FileContentBody";
import { msToTime } from "@/Helper/MsToTime";
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";

const FileContent = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [myFile, setMyFile] = useState(filesData);
  const fileList = myFile.filter((data) => {
    if (searchTerm == null) return data;
    if (data.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return data;
    }
  });
  const getFile = () => {
    document.getElementById("upfile")?.click();
  };
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  const onFileUpload = () => {
    const date = new Date();
    const time = msToTime(date.getMilliseconds(), "ago", "long");
    let myFiles = [...myFile];
    if (selectedFile !== null) {
      myFiles.push({
        id: myFiles.length + 1,
        name: `${selectedFile.name}`,
        size: `${convertSize(selectedFile.size)}`,
        modify: `${time}`,
        icon: "f-22 fa fa-file-text-o txt-info",
        folderClass: "f-44 fa fa-folder txt-warning",
        title: `${selectedFile.name}`,
        folderSize: "10 files",
        modifyFolder: "1 Day ago",
      });
      setMyFile(myFiles);
    }
  };
  return (
    <>
      <Card>
        <CardHeader className="d-md-flex d-sm-block">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="flex-grow-1 d-flex align-items-center justify-content-end">
            <Form className="d-inline-flex">
              <Button color="primary" className="plus-square" onClick={getFile}>
                <SvgIcon className="feather stroke-white" iconId="plus-square" /> {AddNew}
              </Button>
              <div style={{ height: "0px", width: "0px", overflow: "hidden" }}>
                <Input id="upfile" multiple type="file" onChange={(e) => onFileChange(e)} />
              </div>
            </Form>
            <Button outline color="primary" className="ms-2 upload" onClick={onFileUpload}>
              <SvgIcon iconId="upload" className="feather stroke-primary" />
              {Upload}
            </Button>
          </div>
        </CardHeader>
        <FileContentBody myFile={fileList} searchTerm={searchTerm} />
      </Card>
    </>
  );
};

export default FileContent;
