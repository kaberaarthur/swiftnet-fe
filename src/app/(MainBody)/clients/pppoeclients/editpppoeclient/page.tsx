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
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { postLocalLog } from "../../../logservice/logService";
import Cookies from "js-cookie";
import config from "../../../config/config.json";
import moment from "moment-timezone";

interface FormData {
  active: number;
  phone_number: string;
  full_name: string;
  location?: string;
  sms_group: string;
  end_date: string;
  plan_id: number;
  plan_name: string;
  plan_fee: number;
  installation_fee: number;
  router_id: number;
  company_id: number;
  company_username: string;
  secret: string;
  brand: string;
  comments: string;
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

interface Brand {
  id: number;
  name: string;
  company_id: number;
}

const EditClient: React.FC = () => {
  const searchParams = useSearchParams();
  const client_id = searchParams!.get("client_id");
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  
  // State management
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState<FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    active: 0,
    phone_number: "",
    full_name: "",
    location: "",
    sms_group: "",
    end_date: "",
    plan_id: 0,
    plan_name: "",
    plan_fee: 0,
    installation_fee: 0,
    router_id: 0,
    company_id: 0,
    company_username: "",
    secret: "",
    brand: "",
    comments: "",
  });
  
  const [companyActive, setCompanyActive] = useState(false);
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  // Set the minimum selectable end date to the First day of current year
  const currentYearStart = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .slice(0, 16); // format: "YYYY-MM-DDTHH:mm"

  // Utility function to get only changed fields
  const getChangedFields = (): Partial<FormData> => {
    if (!originalData) return {};
    
    const changes: Partial<FormData> = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (formData[key] !== originalData[key]) {
        (changes as any)[key] = formData[key];
      }
    });
    
    return changes;
  };

  // Check if form has changes
  const hasChanges = (): boolean => {
    return Object.keys(getChangedFields()).length > 0;
  };

  // Format date consistently
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    return moment.tz(dateStr, "Africa/Nairobi").format("YYYY-MM-DDTHH:mm");
  };

  const formatDateForServer = (dateStr: string): string => {
    if (!dateStr) return "";
    return moment.tz(dateStr, "YYYY-MM-DDTHH:mm", "Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss");
  };

  // Fetch functions
  const fetchBrands = async () => {
    try {
      const response = await fetch('/backend/brands', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      setAlert({ type: 'danger', message: 'Failed to load brands.' });
    }
  };

  const fetchRouters = async () => {
    try {
      const response = await fetch(`/backend/routers?company_id=${user.company_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setRouters(data);
    } catch (error) {
      console.error("Error fetching routers:", error);
      setAlert({ type: 'danger', message: 'Failed to load routers.' });
    }
  };

  const fetchPlans = async (routerId: number) => {
    try {
      const response = await fetch(
        `/backend/pppoe-plans?router_id=${routerId}&type=pppoe`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
          }
        }
      );
      const plans = await response.json();
      setPppoePlans(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setAlert({ type: 'danger', message: 'Failed to load plans.' });
    }
  };

  const fetchClientData = async () => {
    if (!client_id) return;
    
    try {
      const response = await fetch(`/backend/pppoe-clients/${client_id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const clientData = await response.json();
      
      const processedData: FormData = {
        ...clientData,
        end_date: moment.tz(clientData.end_date, "Africa/Nairobi").format("YYYY-MM-DD HH:mm:ss")
      };

      setFormData(processedData);
      setOriginalData(processedData); // Store original for comparison
    } catch (error) {
      console.error("Error fetching client data:", error);
      setAlert({ type: 'danger', message: 'Failed to load client data.' });
    }
  };

  const checkCompanyActive = async () => {
    try {
      const response = await fetch(`/backend/companies/subscription`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setCompanyActive(data.active);
    } catch (error) {
      console.error("Error checking company active status:", error);
      setAlert({ type: 'danger', message: 'Failed to check company active status.' });
    }
  };

  // Effect hooks
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchClientData(),
        fetchBrands(),
        checkCompanyActive(),
        user.company_id && fetchRouters()
      ]);
      setLoading(false);
    };

    initializeData();
  }, [client_id, user.company_id]);

  useEffect(() => {
    if (formData.router_id) {
      fetchPlans(formData.router_id);
    }
  }, [formData.router_id]);

  // Trial Data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          // Parse the JSON string back into a JavaScript object
          const userObject = JSON.parse(storedUser);
          console.log('User from localStorage:', userObject);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          // Optional: log the raw string if parsing fails
          // console.log('Raw user string:', storedUser);
        }
      } else {
        console.log('No user found in localStorage.');
      }
    }
  }, []);

  // Event handlers
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      if (name === "plan_id") {
        const selectedPlan = pppoePlans.find(plan => plan.id === Number(value));
        return {
          ...prev,
          plan_id: selectedPlan ? selectedPlan.id : 0,
          plan_name: selectedPlan ? selectedPlan.plan_name : "",
          plan_fee: selectedPlan ? selectedPlan.plan_price : 0,
        };
      }

      if (name === "end_date") {
        return {
          ...prev,
          end_date: formatDateForServer(value)
        };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleNumericChange = (field: 'plan_fee' | 'installation_fee') => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseFloat(e.target.value);
      if (!isNaN(numericValue) && numericValue >= 0) {
        setFormData(prev => ({ ...prev, [field]: numericValue }));
      }
    };

  const handleUpdateClient = async () => {
    let changes = getChangedFields();
    
    if (!hasChanges()) {
      setAlert({ type: 'danger', message: 'No changes detected.' });
      return;
    }

    // Always include router_id in the request, even if it hasn't changed
    changes = { ...changes, router_id: formData.router_id, secret: formData.secret };

    // Check if end_date is being updated and is in the future
    if (changes.end_date) {
      const endDateMoment = moment.tz(changes.end_date, "YYYY-MM-DD HH:mm:ss", "Africa/Nairobi");
      const currentTimestamp = moment.tz("Africa/Nairobi");
      
      // If end_date is in the future and active is not already 1, add active: 1 to changes
      if (endDateMoment.isAfter(currentTimestamp) && formData.active !== 1) {
        changes = { ...changes, active: 1 };
        console.log("End date is in the future. Automatically setting active to 1.");
      }
    }

    setLoading(true);
    
    try {
      console.log("Sending only changed fields:", changes);
      
      const response = await fetch(`/backend/edit-pppoe-client/${client_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(changes),
      });

      if (response.ok) {
        setAlert({ type: 'success', message: 'Client updated successfully!' });
        postLocalLog(
          `${user.name} edited PPPoE client with ID ${client_id} & Phone Number ${formData.phone_number}`,
          user,
          formData.router_id
        );
        
        // Update original data to reflect current state (including auto-set active)
        const updatedFormData = { ...formData };
        if (changes.active === 1) {
          updatedFormData.active = 1;
        }
        setOriginalData(updatedFormData);
        setFormData(updatedFormData);
        
        setTimeout(() => {
          setAlert(null);
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error("Failed to update client:", errorData);
        setAlert({ type: 'danger', message: 'Failed to update client.' });
      }
    } catch (error) {
      console.error("Error updating client:", error);
      setAlert({ type: 'danger', message: 'An error occurred while updating the client.' });
    }

    setLoading(false);
  };

  const resetForm = () => {
    if (originalData) {
      setFormData({ ...originalData });
    }
  };

  if (loading && !originalData) {
    return (
      <Container fluid className="mb-4">
        <div className="text-center p-4">Loading...</div>
      </Container>
    );
  }

  return (
    <Container fluid className="mb-4">
      <Breadcrumbs
        mainTitle={`Edit PPPoE Client - ${formData.full_name || "Loading..."} || ${formData.phone_number}`}
        parent=""
      />
      
      {alert && (
        <Alert color={alert.type} dismissible onToggle={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

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
          <Label>Active Status</Label>
          <Input
            type="select"
            name="active"
            value={formData.active}
            onChange={handleInputChange}
          >
            <option value={1}>Active</option>
            <option value={0}>Inactive</option>
          </Input>
        </Col>
        
        <Col sm="6">
          <Label>End Date</Label>
          <Input
            type="datetime-local"
            name="end_date"
            value={formData.end_date}
            onChange={handleInputChange}
            min={currentYearStart} // 🚫 no earlier than January 1st of this year
          />
        </Col>
        
        <Col sm="6">
          <Label>Plan</Label>
          <Input
            type="select"
            name="plan_id"
            value={formData.plan_id}
            onChange={handleInputChange}
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
          <Label>Plan Fee</Label>
          <Input
            type="number"
            name="plan_fee"
            value={formData.plan_fee}
            onChange={handleNumericChange('plan_fee')}
            min="0"
            step="0.01"
          />
        </Col>
        
        <Col sm="6">
          <Label>Installation Fee</Label>
          <Input
            type="number"
            name="installation_fee"
            value={formData.installation_fee}
            onChange={handleNumericChange('installation_fee')}
            min="0"
            step="0.01"
          />
        </Col>
        
        <Col sm="6">
          <Label>Brand</Label>
          <Input
            type="select"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          >
            <option value="">Select a brand</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </Input>
        </Col>

        <Col sm="6">
          <Label>Comments</Label>
          <Input
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
          />
        </Col>

        <Col sm="6">
          <Label>Full Name</Label>
          <Input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
        </Col>

        <Col sm="6">
          <Label>Phone Number</Label>
          <Input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </Col>

        <Col sm="6">
          <Label>Location</Label>
          <Input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleInputChange}
          />
        </Col>

        <Col sm="12" className="mt-3 d-flex gap-2">
            <>
              <Button 
                color="primary" 
                onClick={handleUpdateClient} 
                disabled={loading || !hasChanges()}
              >
                {loading ? "Updating..." : "Update Client"}
              </Button>

              <Button 
                color="secondary" 
                onClick={resetForm}
                disabled={loading || !hasChanges()}
              >
                Reset Changes
              </Button>
            </>
          {/*companyActive ? (
            <>
              <Button 
                color="primary" 
                onClick={handleUpdateClient} 
                disabled={loading || !hasChanges()}
              >
                {loading ? "Updating..." : "Update Client"}
              </Button>

              <Button 
                color="secondary" 
                onClick={resetForm}
                disabled={loading || !hasChanges()}
              >
                Reset Changes
              </Button>
            </>
          ) : (
            <div className="w-100">
              <div 
                className="alert alert-warning text-center mt-2" 
                role="alert"
                style={{ fontWeight: 500 }}
              >
                🚫 You cannot update clients since your subscription has expired.
              </div>
            </div>
          )*/}
        </Col>
      </Row>
    </Container>
  );
};

export default EditClient;