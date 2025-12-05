'use client'
import { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert } from "reactstrap";
import { FormsControl } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../Redux/Store';

// Alert
import SvgIcon from "@/CommonComponent/SVG/SvgIcon";
// Alert
import Cookies from "js-cookie";


interface FormData {
  router_name: string;
  ip_address: string;
  username: string;
  interface: string;
  router_secret: string;
  description: string;
  company_id: number;
  created_by: number;
  company_username: string;
  port: number;   // <-- NEW FIELD
}

const AddNewRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  // Alert
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleAlert, setVisibleAlert] = useState<boolean>(true);
  const [visibleAlertThree, setVisibleAlertThree] = useState(true);
  const onDismiss = () => setVisible(false);
  const onDismissAlert = () => setVisibleAlert(false);
  const onDismissAlertThree = () => setVisibleAlertThree(false);

  const [error, setError] = useState<string | null>(null); // State for error message

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  const initialFormData: FormData = {
    router_name: "",
    ip_address: "",
    username: "",
    interface: "",
    router_secret: "",
    description: "",
    company_id: 0,
    created_by: 0,
    company_username: "@company",
    port: 22,  // <-- DEFAULT PORT
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        company_id: user.company_id !== null ? user.company_id : 0,
        created_by: user.id !== null ? user.id : 0,
        company_username: user.company_username !== null ? user.company_username : "@company",
      }));
    }
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "port" ? Number(value) : value,
    }));
  };

  const handleAddRouter = async () => {
    const url = '/backend/routers';

    const requiredFields = [
      'router_name',
      'ip_address',
      'username',
      'interface',
      'router_secret',
      'port'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        setError(`Please fill out the ${field.replace(/_/g, ' ')} field.`);
        return;
      }
    }

    setError(null);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Network response was not ok: ${errorBody}`);
      }

      await response.json();
      setVisible(true);
      setFormData(initialFormData);

    } catch (error) {
      console.error('Error adding router:', error);
    }
  };

  return (
    <>
      <Breadcrumbs mainTitle={'Add a Router'} parent={FormsControl} />
      <Container fluid>
        <Row className="g-3">

          <Col sm="12">
            <Label>{'Router Name'}</Label>
            <Input
              value={formData.router_name}
              name="router_name"
              type="text"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'IP Address'}</Label>
            <Input
              value={formData.ip_address}
              name="ip_address"
              type="text"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Username'}</Label>
            <Input
              value={formData.username}
              name="username"
              type="text"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Interface'}</Label>
            <Input
              value={formData.interface}
              name="interface"
              type="text"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Router Secret'}</Label>
            <Input
              value={formData.router_secret}
              name="router_secret"
              type="text"
              onChange={handleInputChange}
            />
          </Col>

          {/* NEW PORT FIELD */}
          <Col sm="12">
            <Label>{'Port (Default: 22)'}</Label>
            <Input
              value={formData.port}
              name="port"
              type="number"
              placeholder="22"
              onChange={handleInputChange}
            />
          </Col>

          <Col sm="12">
            <Label>{'Description'}</Label>
            <Input
              value={formData.description}
              name="description"
              type="textarea"
              onChange={handleInputChange}
            />
          </Col>

          {error && (
            <Col sm="12">
              <Alert color="danger">{error}</Alert>
            </Col>
          )}

          <Col sm="12">
            <Alert color="transparent" fade isOpen={visible} className="border-success alert-dismissible p-0">
              <div className="alert-arrow bg-success">
                <SvgIcon iconId="clock" className="feather" />
              </div>
              <p>Router <strong className="txt-dark">added</strong> successfully</p>
              <Button className="p-0 border-0 me-2 ms-auto" onClick={onDismiss}>
                <span className="bg-success px-3 py-1">Dismiss</span>
              </Button>
            </Alert>
          </Col>

          <Col sm="12">
            <Button color='info' className="px-6 py-2" onClick={handleAddRouter}>
              Add Router
            </Button>
          </Col>

        </Row>
      </Container>
    </>
  );
};

export default AddNewRouter;
