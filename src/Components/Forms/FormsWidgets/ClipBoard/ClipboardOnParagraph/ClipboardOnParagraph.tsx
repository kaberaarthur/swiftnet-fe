import { useState } from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import { ClipboardOnParagraphs, Copy, CopyFromParagraph } from '@/Constant';
import CopyToClipboard from 'react-copy-to-clipboard';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';

const ClipboardOnParagraph = () => {
    const clipBoardParaGraph:string = "On that day, hopes and dreams were crushed. Even though it should have been anticipated, it nonetheless surprised me. The warning indicators have been disregarded in favour of the slim chance that it would actually occur. From a hopeful prospect, it had evolved into an unquestionable conviction that it must be fate. That was up until it wasn't, at which point all of the aspirations and dreams collapsed.";
    const [clipBoardValues, setClipBoardValues] = useState({ value: clipBoardParaGraph, copied: false });
  
    return (
      <Col sm="12" md="6">
        <Card>
          <CommonCardHeader title={ClipboardOnParagraphs} headClass='pb-0' />
          <CardBody>
            <div className="clipboaard-container">
              <p className="f-16">{CopyFromParagraph}</p>
              <CopyToClipboard text={clipBoardValues.value} onCopy={(value) => setClipBoardValues({ value, copied: true })}>
                <h6 className="border rounded card-body f-w-300">{clipBoardParaGraph}</h6>
              </CopyToClipboard>
              <div className="mt-3 text-end">
                <CopyToClipboard text={clipBoardValues.value} onCopy={(value) => setClipBoardValues({ value, copied: true })}>
                  <Button className="btn-clipboard" color="info">
                    <i className="fa fa-copy"></i> {Copy}
                  </Button>
                </CopyToClipboard>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default ClipboardOnParagraph