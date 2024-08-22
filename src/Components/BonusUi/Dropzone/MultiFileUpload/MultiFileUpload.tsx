import { MultiFileUploads } from "@/Constant";
import { Card, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { fileUploadData } from "@/Data/BonusUi/Dropzone/Dropzone";
import CommonFileUpload from "../Common/CommonFileUpload";

const MultiFileUpload = () => {
  return (
    <Col lg="6">
      <Card>
      <CardHeaderCommon title={MultiFileUploads} span={fileUploadData} headClass=''pb-0 />
          <CommonFileUpload multiple={true} body={true} />
      </Card>
    </Col>
  );
};

export default MultiFileUpload;
