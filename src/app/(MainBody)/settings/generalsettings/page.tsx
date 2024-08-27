"use client";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface FormData {
  company: string;
  address: string;
  zip: string;
  phone: string;
  note: string;
  pprefix: string;
  theme: string;
  reconnect: string;
  mpesa: string;
  hotspot: string;
  expirt_time: string;
  static_c: string;
}

const GeneralSettings: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: "WISPMAN",
    address: "KITENGELA",
    zip: "6844-4894",
    phone: "",
    note: "Thank you...",
    pprefix: "ACC2021",
    theme: "default",
    reconnect: "0",
    mpesa: "1",
    hotspot: "hourly",
    expirt_time: "1",
    static_c: "0",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle the form submission logic here
    console.log(formData);
  };

  return (
    <>
      <Breadcrumbs mainTitle="General Settings" parent={""} />
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm="12">
            <div className="card shadow">
              <div className="card-body">
                <div className="form-group mb-3">
                  <Label for="company">Application Name/Company Name</Label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                  <span className="help-block">This Name will be shown on the Title</span>
                </div>

                <div className="form-group mb-3">
                  <Label for="address">Address</Label>
                  <Input
                    type="textarea"
                    id="address"
                    name="address"
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <span className="help-block">You can use HTML tags</span>
                </div>

                <div className="form-group mb-3">
                  <Label for="zip">Zip Code</Label>
                  <Input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <Label for="phone">Phone Number</Label>
                  <Input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <Label for="note">Note Invoice</Label>
                  <Input
                    type="textarea"
                    id="note"
                    name="note"
                    rows="3"
                    value={formData.note}
                    onChange={handleInputChange}
                  />
                  <span className="help-block">You can use HTML tags</span>
                </div>

                <div className="form-group mb-3">
                  <Label for="pprefix">Account Prefix</Label>
                  <Input
                    type="text"
                    id="pprefix"
                    name="pprefix"
                    value={formData.pprefix}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group mb-3">
                  <Label for="theme">Theme</Label>
                  <Input
                    type="select"
                    id="theme"
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="default">Default</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Label for="reconnect">Wallet balance to recharge account</Label>
                  <Input
                    type="select"
                    id="reconnect"
                    name="reconnect"
                    value={formData.reconnect}
                    onChange={handleInputChange}
                  >
                    <option value="1">Activated wallet balance usage</option>
                    <option value="0">Deactivated wallet balance usage</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Label for="mpesa">Mpesa priority to recharge account</Label>
                  <Input
                    type="select"
                    id="mpesa"
                    name="mpesa"
                    value={formData.mpesa}
                    onChange={handleInputChange}
                  >
                    <option value="1">Activated mpesa balance priority</option>
                    <option value="0">Deactivated mpesa balance priority</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Label for="hotspot">Hotspot Time limit type</Label>
                  <Input
                    type="select"
                    id="hotspot"
                    name="hotspot"
                    value={formData.hotspot}
                    onChange={handleInputChange}
                  >
                    <option value="default">Default Router uptime</option>
                    <option value="hourly">Current time limit</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Label for="expirt_time">PPPOE &amp; STATIC Expiry time</Label>
                  <Input
                    type="select"
                    id="expirt_time"
                    name="expirt_time"
                    value={formData.expirt_time}
                    onChange={handleInputChange}
                  >
                    <option value="1">As Per payment time</option>
                    <option value="0">At 11:59 PM</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Label for="static_c">STATIC BLOCK OR REGULAR</Label>
                  <Input
                    type="select"
                    id="static_c"
                    name="static_c"
                    value={formData.static_c}
                    onChange={handleInputChange}
                  >
                    <option value="0">Regular</option>
                    <option value="1">Block</option>
                  </Input>
                </div>

                <div className="form-group mb-3">
                  <Button color="info" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default GeneralSettings;
