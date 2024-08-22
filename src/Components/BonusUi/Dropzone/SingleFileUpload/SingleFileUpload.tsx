import { SingleFileUploads } from "@/Constant";
import { Card, Col } from "reactstrap";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";
import { fileUploadData } from "@/Data/BonusUi/Dropzone/Dropzone";
import CommonFileUpload from "../Common/CommonFileUpload";

const SingleFileUpload = () => {
  return (
    <Col lg="6">
      <Card>
      <CardHeaderCommon title={SingleFileUploads} span={fileUploadData} headClass=''pb-0 />
          <CommonFileUpload maxFiles={1} body={true}/>
      </Card>
    </Col>
  );
};

export default SingleFileUpload;
