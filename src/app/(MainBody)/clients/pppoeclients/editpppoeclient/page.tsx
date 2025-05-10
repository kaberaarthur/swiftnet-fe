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
import Cookies from "js-cookie";


import config from "../../../config/config.json";

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
  const client_id = searchParams.get("client_id");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; message: string } | null>(null);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  function formatDate(utcDate: string): string {
    const date = new Date(utcDate);
  
    return date.toLocaleString('en-US', {
      weekday: 'long', // Full weekday name
      year: 'numeric', // Full year
      month: 'long', // Full month name
      day: 'numeric', // Day of the month
      hour: '2-digit', // Hour in 2-digit format
      minute: '2-digit', // Minute in 2-digit format
      second: '2-digit', // Second in 2-digit format
      hour12: true, // 12-hour clock format (AM/PM)
    });
  }
  
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
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [endDate, setEndDate] = useState("");

  // Handle input change
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 4);
    const updatedTime = currentTime.toLocaleTimeString("en-GB", { hour12: false });

    console.log("The Selected Date: ", e.target.value + " " + updatedTime)
    setEndDate(e.target.value); // Update state directly
  };

  const user = useSelector((state: RootState) => state.user);

  // Fetch Brands
  const fetchBrands = async () => {
    try {
      const response = await fetch('/backend/brands', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Failed to fetch brands:', error);
      setAlert({ type: 'danger', message: 'Failed to load brands.' });
    } finally {
      setLoading(false);
    }
  };

  // Fetch client data
  useEffect(() => {
    if (client_id) {
      const fetchClientData = async () => {
        setLoading(true);
        try {
          const response = await fetch(`/backend/pppoe-clients/${client_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}` // Adjust token retrieval method as needed
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const clientData = await response.json();

          clientData.end_date = new Date(clientData.end_date);
          clientData.end_date.setHours(clientData.end_date.getHours() + 4);

          console.log("DB Date (UTC+3):", clientData.end_date);

          // Convert end_date to "yyyy-MM-dd" format
          const formattedEndDate = clientData.end_date
            ? new Date(clientData.end_date).toISOString().split("T")[0]
            : "";

          setFormData({
            active: clientData.active,
            phone_number: clientData.phone_number,
            full_name: clientData.full_name,
            location: clientData.location,
            sms_group: clientData.sms_group,
            end_date: formattedEndDate,
            plan_id: clientData.plan_id,
            plan_name: clientData.plan_name,
            plan_fee: clientData.plan_fee,
            installation_fee: clientData.installation_fee,
            router_id: clientData.router_id,
            company_id: clientData.company_id,
            company_username: clientData.company_username,
            secret: clientData.secret,
            brand: clientData.brand,
            comments: clientData.comments,
          });

          console.log("Current Client Date: ", formattedEndDate);
          setEndDate(formattedEndDate);
          setLoading(false);
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
        setLoading(true);

        try {
          const response = await fetch(`/backend/routers?company_id=${user.company_id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}` // Adjust token retrieval method if needed
            }
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setRouters(data);
        } catch (error) {
          console.error("Error fetching routers:", error);
        }
        setLoading(false);
      };

      fetchRouters();
    }
  }, [user.company_id]);


  // Fetch plans based on router_id
  useEffect(() => {
    if (formData.router_id) {
      const fetchPlans = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/backend/pppoe-plans?router_id=${formData.router_id}&type=pppoe`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` // Adjust if token is stored differently
              }
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const plans = await response.json();
          setPppoePlans(plans);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
        setLoading(false);
      };

      fetchPlans();
    }
  }, [formData.router_id]);


  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = parseFloat(value); // Convert input to a number
  
    if (!isNaN(numericValue) && numericValue >= 0) {
      setFormData((prevData) => ({
        ...prevData,
        plan_fee: numericValue, // Ensure type matches FormData
      }));
    }
  };  

  const handleInstallationFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numericValue = parseFloat(value); // Convert input to a number
  
    if (!isNaN(numericValue) && numericValue >= 0) {
      setFormData((prevData) => ({
        ...prevData,
        installation_fee: numericValue, // Ensure type matches FormData
      }));
    }
  };  

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      // If the user is changing the plan, update plan_name and plan_fee
      if (name === "plan_id") {
        const selectedPlan = pppoePlans.find((plan) => plan.id === Number(value));
        return {
          ...prev,
          plan_id: selectedPlan ? selectedPlan.id : 0,
          plan_name: selectedPlan ? selectedPlan.plan_name : "",
          plan_fee: selectedPlan ? selectedPlan.plan_price : 0,
        };
      }
  
      return {
        ...prev,
        [name]: value,
      };
    });
  }; 

  const formatDateWithTime = (dateStr: string, hoursToAdd: number = 3): string => {
    const date = new Date(dateStr); // Convert YYYY-MM-DD to Date object
  
    // Add hours
    date.setHours(date.getHours() + hoursToAdd);
  
    // Format to YYYY-MM-DD HH:mm:ss
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ` +
      `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
  
    return formattedDate;
  };
  

  const validateEndDate = (selectedDateStr: string, currentEndDateStr: string) => {
      const selectedDate = new Date(selectedDateStr);
      const currentEndDate = new Date(currentEndDateStr);
    
      // Logging the dates
      console.log("Selected Date:", selectedDate.toISOString());
      console.log("Current End Date:", currentEndDate.toISOString());
    
      // No max limit, so just return the selected date as valid
      return { 
        valid: true, 
        message: "Correct Days Selected", 
        adjustedDate: selectedDate.toISOString().split("T")[0] 
      };
  };

  const [shouldUpdateClient, setShouldUpdateClient] = useState(false);  // Flag to trigger the fetch

  // The updateClient function, moved into a useEffect that listens to shouldUpdateClient
  useEffect(() => {
    const updateClient = async () => {
      setLoading(true);

      console.log("Editing User: ", formData);
      try {
        const response = await fetch(`/backend/edit-pppoe-client/${client_id}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Authorization":  `Bearer ${accessToken}`
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSuccessMessage("Client updated successfully!");
          postLocalLog(`${user.name} edited PPPoE client with ID ${client_id} & Phone Number ${formData.phone_number} & End Date ${formData.end_date} hosted on Router: ${formData.router_id}`, user, formData.router_id);
          setTimeout(() => {
            setSuccessMessage(null);
            window.location.reload(); // This will reload the page after 5 seconds
          }, 5000);
        } else {
          const errorData = await response.json();
          console.error("Failed to update client:", errorData);
          setAlertMessage("Failed to update client.");
          /*setTimeout(() => {
            window.location.reload();
          }, 1000);*/
        }
      } catch (error) {
        console.error("Error updating client:", error);
        setAlertMessage("An error occurred while updating the client.");
      }

      setLoading(false);
        
    };

    // Run updateClient only when shouldUpdateClient is true
    if (shouldUpdateClient) {
      updateClient();
      setShouldUpdateClient(false);  // Reset the flag after the request
    }
  }, [shouldUpdateClient, formData]);  // Depend on shouldUpdateClient and formData

  // Your handleUpdateClient function to validate and update formData
  const handleUpdateClient = async () => {
    setLoading(true);
    const validation = validateEndDate(formatDateWithTime(endDate), formatDateWithTime(formData.end_date));

    if (validation.valid) {
      console.log(validation.message ?? "");

      setAlertMessage("");

      if (validation.adjustedDate) {
        // Update formData.end_date with adjustedDate
        setFormData((prevData: FormData) => {
          const updatedEndDate = formatDateWithTime(validation.adjustedDate);
          console.log("Updated end date with time: ", updatedEndDate);  // Log updated value

          return {
            ...prevData, // Preserve existing properties
            end_date: updatedEndDate, // Update only the end_date field
          };
        });

        // Set the flag to trigger the updateClient function after formData is updated
        setShouldUpdateClient(true);
      }
      setLoading(false);

      setTimeout(() => {
        // window.location.reload();
        console.log("Successful Reload");
      }, 2000);
      

    } else {
      setAlertMessage(validation.message ?? "");
      console.log("Invalid Date: ", validation.adjustedDate ?? "");
      setLoading(false);

      /*setTimeout(() => {
        window.location.reload();
      }, 100);*/
      
      return;
    }
  };

  useEffect(() => {
      fetchBrands();
    }, []);

  return (
    <Container fluid>
      <Breadcrumbs
        mainTitle={`Edit PPPoE Client - ${
          `${formData.full_name} || ${formData.phone_number}` || "Loading..."
        }`}
        parent=""
      />
      {alertMessage && <Alert color="danger">{alertMessage}</Alert>}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
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
            type="date"
            name="end_date"
            value={endDate}
            onChange={handleEndDateChange} // Calls function on change
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
          <Label>Plan Fee</Label>
          <Input
            type="text"
            name="sms_group"
            value={formData.plan_fee}
            onChange={handleFeeChange}
          />
        </Col>
        <Col sm="6">
          <Label>Installation Fee</Label>
          <Input
            type="text"
            name="sms_group"
            value={formData.installation_fee}
            onChange={handleInstallationFeeChange}
          />
        </Col>
        <Col sm="6">
          <Label for="brand">Brand</Label>
          <Input
            type="select"
            name="brand"
            id="brand"
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

        <Col sm="6" className="mt-3">
          <Button color="primary" onClick={handleUpdateClient} disabled={loading}>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full"></div>
                <span>Loading...</span>
              </div>
            ) : (
              `Update Client`
            )}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default EditClient;