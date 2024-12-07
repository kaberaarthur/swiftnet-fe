"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "../../../../../Redux/Store";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Button,
  Alert,
  Spinner,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { postLocalLog } from "../../../logservice/logService";

interface FormData {
  phone_number: string;
  full_name: string;
  sms_group: string;
  end_date: string;
  plan_id: number;
  plan_name: string;
  plan_fee: number;
  router_id: number;
  company_id: number;
  company_username: string;
}

interface Router {
  id: number;
  router_name: string;
}

interface PPPOEPlan {
  id: number;
  plan_name: string;
  rate_limit_string: string;
  plan_price: number;
}

const EditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const client_id = searchParams.get("client_id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    phone_number: "",
    full_name: "",
    sms_group: "",
    end_date: "",
    plan_id: 0,
    plan_name: "",
    plan_fee: 0,
    router_id: 0,
    company_id: 0,
    company_username: "",
  });
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);

  // Fetch client data
  useEffect(() => {
    if (client_id) {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients/${client_id}`);
          const clientData = await response.json();
          setFormData({
            phone_number: clientData.phone_number,
            full_name: clientData.full_name,
            sms_group: clientData.sms_group,
            end_date: clientData.end_date,
            plan_id: clientData.plan_id,
            plan_name: clientData.plan_name,
            plan_fee: clientData.plan_fee,
            router_id: clientData.router_id,
            company_id: clientData.company_id,
            company_username: clientData.company_username,
          });
        } catch (error) {
          console.error("Error fetching client data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [client_id]);

  // Fetch routers
  useEffect(() => {
    if (user.company_id) {
      const fetchRouters = async () => {
        try {
          const response = await fetch(
            `/backend/routers?company_id=${user.company_id}`
          );
          const data = await response.json();
          setRouters(data);
        } catch (error) {
          console.error("Error fetching routers:", error);
        }
      };
      fetchRouters();
    }
  }, [user.company_id]);

  // Fetch plans based on router_id
  useEffect(() => {
    if (formData.router_id) {
      const fetchPlans = async () => {
        try {
          const response = await fetch(
            `/backend/pppoe-plans?router_id=${formData.router_id}&type=pppoe`
          );
          const plans = await response.json();
          setPppoePlans(plans);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      };
      fetchPlans();
    }
  }, [formData.router_id]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEndDate = (date: string): boolean => {
    const selectedDate = new Date(date);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 4);
    return selectedDate <= maxDate;
  };

  const handleUpdateClient = async () => {
    if (!validateEndDate(formData.end_date)) {
      setAlertMessage("End date must not exceed 4 days from today.");
      return;
    }

    try {
      const response = await fetch(`/backend/pppoe-clients/${client_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlertMessage("Client updated successfully!");
        postLocalLog(`Edited PPPoE client with ID ${client_id}`, user);
        setTimeout(() => setAlertMessage(null), 5000);
      } else {
        const errorData = await response.json();
        console.error("Failed to update client:", errorData);
        setAlertMessage("Failed to update client.");
      }
    } catch (error) {
      console.error("Error updating client:", error);
      setAlertMessage("An error occurred while updating the client.");
    }
  };

  return (
    <Container fluid>
      <Breadcrumbs
        mainTitle={`Edit PPPoE Client - ${
          `${formData.full_name} || ${formData.phone_number}` || "Loading..."
        }`}
        parent=""
      />
      {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
      <Row>
        <Col sm="6">
          <Label>SMS Group</Label>
          <Input
            type="text"
            name="sms_group"
            value={formData.sms_group}
            onChange={handleInputChange}
          />
        </Col>
        <Col sm="6">
          <Label>End Date</Label>
          <Input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
          />
        </Col>
        <Col sm="6">
          <Label>Plan</Label>
          <Input
            type="select"
            name="plan_id"
            value={formData.plan_id}
            onChange={(e) => handleInputChange(e)}
          >
            <option value="">Select Plan</option>
            {pppoePlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.plan_name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm="6">
          <Label>Router</Label>
          <Input
            type="select"
            name="router_id"
            value={formData.router_id}
            onChange={handleInputChange}
          >
            <option value="">Select Router</option>
            {routers.map((router) => (
              <option key={router.id} value={router.id}>
                {router.router_name}
              </option>
            ))}
          </Input>
        </Col>
        <Col sm="6" className="mt-3">
          <Button color="primary" onClick={handleUpdateClient} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Update Client"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditClient;
