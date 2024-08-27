"use client";
import { useState, ChangeEvent } from "react";
import { Container, Row, Col, Input, Label, Button } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

interface FormData {
  routerName: string;
  ipAddress: string;
  username: string;
  interface: string;
  routerSecret: string;
  description: string;
}

const AddNewRouter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    routerName: "",
    ipAddress: "",
    username: "",
    interface: "",
    routerSecret: "",
    description: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRouter = () => {
    // Handle the logic to add a router here
    console.log(formData);
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Router'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">
          <Col sm="12">
            <Label>{'Router Name'}</Label>
            <Input
              value={formData.routerName}
              name="routerName"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'IP Address'}</Label>
            <Input
              value={formData.ipAddress}
              name="ipAddress"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Username'}</Label>
            <Input
              value={formData.username}
              name="username"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Interface'}</Label>
            <Input
              value={formData.interface}
              name="interface"
              type="text"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Router Secret'}</Label>
            <Input
              value={formData.routerSecret}
              name="routerSecret"
              type="password"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Description'}</Label>
            <Input
              value={formData.description}
              name="description"
              type="textarea"
              placeholder=''
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Button color='info' className="px-6 py-2" onClick={handleAddRouter}>Add Router</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddNewRouter;