import { Card, CardBody, Form } from "reactstrap";
import { BlogDropFilesHereOrClickToUpload, ProductImageHeading } from "@/Constant";
import { useState } from "react";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import SelectSize from "./SelectSize";


const ProductImage = () => {
  const [files, setFiles] = useState<ExtFile[]>([]);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setFiles(incomingFiles);
  };

  const removeFile = (id: string | number | undefined) => {
    setFiles(files.filter((x: ExtFile) => x.id !== id));
  };

  return (
    <Card>
      <CardBody>
        <div className="product-info">
          <h4>{ProductImageHeading}</h4>
          <Form>
            <Dropzone onChange={(files) => updateFiles(files)} value={files} maxFiles={1} header={false} footer={false} minHeight="80px" name="fileName1">
              {files.map((file: ExtFile) => (
                <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />
              ))}
              {files.length === 0 && (
                <div>
                  <i className="icon-cloud-up txt-primary"></i>
                  <h6>{BlogDropFilesHereOrClickToUpload}</h6>
                  <span className="fs-6">
                    (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                  </span>
                </div>
              )}
            </Dropzone>
          </Form>
          <SelectSize />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductImage;
