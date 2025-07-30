"use client";
import { useState, useEffect } from "react";
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

interface PaymentData {
  phone_number: string;
  company_id: number;
  company_username: string;
  router_id: number;
  router_name: string;
  plan_id: number;
  mac_address: string;
  payment_type: string;
  installation_fee: number;
}

interface ClientData {
  phone_number: string;
  full_name: string;
  router_id: number;
  company_id: number;
  router_name: string;
  plan_id: number;
}

interface PlanDetails {
  id: number;
  plan_name: string;
  plan_price: number;
  router_name: string;
}

interface RouterData {
    id: number;
    router_name: string;
}

const PaymentProcessing: React.FC = () => {
  const searchParams = useSearchParams();
  const client_id = searchParams!.get("client_id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [routerData, setRouterData] = useState<RouterData | null>(null);
  const [installationFee, setInstallationFee] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (client_id) {
      const fetchClientData = async () => {
        try {
          const response = await fetch(`/backend/pppoe-clients/${client_id}`);
          const data = await response.json();
          setClientData(data);
        } catch (error) {
          console.error("Error fetching client data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchClientData();
    }
  }, [client_id]);

  useEffect(() => {
    if (clientData?.plan_id) {
      const fetchPlanDetails = async () => {
        try {
          const response = await fetch(`/backend/pppoe-plans/${clientData.plan_id}`);
          const plan = await response.json();
          setPlanDetails(plan);
        } catch (error) {
          console.error("Error fetching plan details:", error);
        }
      };
      fetchPlanDetails();
    }
  }, [clientData?.plan_id]);


  // Fetch Router Name
  useEffect(() => {
    if (clientData?.router_id) {
      const fetchPlanDetails = async () => {
        try {
          const response = await fetch(`/backend/routers/${clientData.router_id}`);
          const router = await response.json();
          setRouterData(router);
        } catch (error) {
          console.error("Error fetching plan details:", error);
        }
      };
      fetchPlanDetails();
    }
  }, [clientData?.router_id]);

  const handleSubmit = () => {
    if (!clientData || !planDetails) {
      setAlertMessage("Client or plan details are missing.");
      return;
    }

    const paymentData: PaymentData = {
      phone_number: clientData.phone_number,
      company_id: clientData.company_id,
      company_username: user.company_username,
      router_id: clientData.router_id,
      router_name: routerData?.router_name || " ",
      plan_id: clientData.plan_id,
      mac_address: "N/A",
      payment_type: installationFee > 0 ? "first" : "repeat",
      installation_fee: installationFee,
    };

    console.log("Payment Data:", paymentData);

    // Uncomment the following code to make the payment request
    fetch('/backend/pppoe-payment-request-pro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData),
    })
      .then(response => {
        if (response.ok) {
          alert('Payment request successful!');
        } else {
          console.error('Payment request failed:', response.statusText);
          setAlertMessage('Payment request failed.');
        }
      })
      .catch(error => {
        console.error('Error making payment request:', error);
        setAlertMessage('An error occurred while processing the payment.');
      });
  };

  return (
    <Container fluid>
      <Breadcrumbs mainTitle="Payment Processing" parent="" />
      {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
      <Row>
        <Col sm="6">
          <Label>Full Name</Label>
          <Input type="text" value={clientData?.full_name || ""} disabled />
        </Col>
        <Col sm="6">
          <Label>Phone Number</Label>
          <Input type="text" value={clientData?.phone_number || ""} disabled />
        </Col>
        <Col sm="6">
          <Label>Plan Name</Label>
          <Input type="text" value={planDetails?.plan_name || ""} disabled />
        </Col>
        <Col sm="6">
          <Label>Plan Fee</Label>
          <Input type="number" value={planDetails?.plan_price || 0} disabled />
        </Col>
        <Col sm="6">
          <Label>Installation Fee</Label>
          <Input
            type="number"
            value={installationFee}
            onChange={(e) => setInstallationFee(Number(e.target.value) || 0)}
          />
        </Col>
        <Col sm="6" className="mt-3">
          <Button color="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner size="sm" /> : "Process Payment"}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentProcessing;
