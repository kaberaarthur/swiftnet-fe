"use client";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface FormData {
  name: string;
  rangeIP: string;
  router: string;
}

const AddIPRange: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    rangeIP: "",
    router: "NEXAHUB_951",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle the logic to save changes here
    console.log(formData);
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add IP Range'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Col sm="12">
            <Input
              value={formData.name}
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Range IP'}</Label>
            <Input
              value={formData.rangeIP}
              name="rangeIP"
              type="text"
              placeholder="ex: 192.168.88.2-192.168.88.254"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Routers'}</Label>
            <Input 
              type="select" 
              name="router"
              value={formData.router}
              onChange={handleInputChange}
            >
              <option value="NEXAHUB_951">NEXAHUB_951</option>
              {/* Add more router options here */}
            </Input>
          </Col>

          <Col sm="12" className="d-flex align-items-center">
            <Button color='info' className="px-6 py-2 me-2" onClick={handleSaveChanges}>Save Changes</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddIPRange;