import { Button, Card, CardBody, Col, Input } from 'reactstrap'
import { ClipboardTextInput, Copy, Cut, CutAndCopyText, CutAndCopyTextPlaceholder } from '@/Constant'
import { useState } from 'react'
import CopyToClipboard from "react-copy-to-clipboard";
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';

const ClipboardOnTextInput = () => {
  const [clipboardTextValue, setClipboardTextValue] = useState({ value: "", copied: false });
  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader title={ClipboardTextInput} headClass='pb-0' />
        <CardBody>
          <div className="clipboaard-container">
            <p className="f-16">{CutAndCopyText}</p>
            <Input id="clipboardExample1" type="text" placeholder={CutAndCopyTextPlaceholder} value={clipboardTextValue.value} onChange={({ target: { value } }) => setClipboardTextValue({ value, copied: false })} />
            <div className="mt-3 text-end">
              <CopyToClipboard text={clipboardTextValue.value} onCopy={(value) => setClipboardTextValue({ value, copied: true })}>
                <Button color="primary" className="btn-clipboard me-1"><i className="fa fa-copy"></i> {Copy}</Button>
              </CopyToClipboard>
              <CopyToClipboard text={clipboardTextValue.value} onCopy={() => setClipboardTextValue({ copied: true, value: "" })}>
                <Button color="secondary" className="btn-clipboard-cut"><i className="fa fa-cut"></i> {Cut}</Button>
              </CopyToClipboard>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  )
}

export default ClipboardOnTextInput