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

  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "danger"; message: string } | null>(null);

  // Router-change tracking
  const [originalRouterId, setOriginalRouterId] = useState<number>(0);
  const [routerChanged, setRouterChanged] = useState(false);
  const [plansLoading, setPlansLoading] = useState(false);

  const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

  // Minimum selectable end date — January 1st of the current year
  const currentYearStart = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .slice(0, 16);

  // ─── Helpers ────────────────────────────────────────────────────────────────

  const getChangedFields = (): Partial<FormData> => {
    if (!originalData) return {};
    const changes: Partial<FormData> = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      if (formData[key] !== originalData[key]) {
        (changes as any)[key] = formData[key];
      }
    });
    return changes;
  };

  const hasChanges = (): boolean => Object.keys(getChangedFields()).length > 0;

  // If the router changed, the user must also pick a new plan before saving
  const isValid = (): boolean => {
    if (routerChanged && formData.plan_id === originalData?.plan_id) return false;
    return true;
  };

  const getValidationMessage = (): string | null => {
    if (routerChanged && formData.plan_id === originalData?.plan_id) {
      return "You changed the router — please select a new plan for the selected router before saving.";
    }
    return null;
  };

  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    return moment.tz(dateStr, "Africa/Nairobi").format("YYYY-MM-DDTHH:mm");
  };

  const formatDateForServer = (dateStr: string): string => {
    if (!dateStr) return "";
    return moment
      .tz(dateStr, "YYYY-MM-DDTHH:mm", "Africa/Nairobi")
      .format("YYYY-MM-DD HH:mm:ss");
  };

  // ─── Fetch functions ─────────────────────────────────────────────────────────

  const fetchBrands = async () => {
    try {
      const response = await fetch("/backend/brands", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setBrands(await response.json());
    } catch (error) {
      console.error("Failed to fetch brands:", error);
      setAlert({ type: "danger", message: "Failed to load brands." });
    }
  };

  const fetchRouters = async () => {
    try {
      const response = await fetch(
        `/backend/routers?company_id=${user.company_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setRouters(await response.json());
    } catch (error) {
      console.error("Error fetching routers:", error);
      setAlert({ type: "danger", message: "Failed to load routers." });
    }
  };

  const fetchPlans = async (routerId: number) => {
    setPlansLoading(true);
    try {
      const response = await fetch(
        `/backend/pppoe-plans?router_id=${routerId}&type=pppoe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPppoePlans(await response.json());
    } catch (error) {
      console.error("Error fetching plans:", error);
      setAlert({ type: "danger", message: "Failed to load plans." });
    } finally {
      setPlansLoading(false);
    }
  };

  const fetchClientData = async () => {
    if (!client_id) return;
    try {
      const response = await fetch(`/backend/pppoe-clients/${client_id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const clientData = await response.json();
      const processedData: FormData = {
        ...clientData,
        end_date: moment
          .tz(clientData.end_date, "Africa/Nairobi")
          .format("YYYY-MM-DD HH:mm:ss"),
      };

      setFormData(processedData);
      setOriginalData(processedData);
      setOriginalRouterId(processedData.router_id);
    } catch (error) {
      console.error("Error fetching client data:", error);
      setAlert({ type: "danger", message: "Failed to load client data." });
    }
  };

  const checkCompanyActive = async () => {
    try {
      await fetch(`/backend/companies/subscription`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error checking company active status:", error);
    }
  };

  // ─── Effects ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      await Promise.all([
        fetchClientData(),
        fetchBrands(),
        checkCompanyActive(),
        user.company_id && fetchRouters(),
      ]);
      setLoading(false);
    };
    initializeData();
  }, [client_id, user.company_id]);

  // Re-fetch plans whenever the selected router changes
  useEffect(() => {
    if (formData.router_id) {
      fetchPlans(formData.router_id);
    }
  }, [formData.router_id]);

  // ─── Event handlers ───────────────────────────────────────────────────────────

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "router_id") {
        const newRouterId = Number(value);
        const isChangingRouter = newRouterId !== originalRouterId;
        setRouterChanged(isChangingRouter);

        return {
          ...prev,
          router_id: newRouterId,
          // Force the user to pick a fresh plan when switching routers
          ...(isChangingRouter && {
            plan_id: 0,
            plan_name: "",
            plan_fee: 0,
          }),
        };
      }

      if (name === "plan_id") {
        const selectedPlan = pppoePlans.find((p) => p.id === Number(value));
        return {
          ...prev,
          plan_id: selectedPlan ? selectedPlan.id : 0,
          plan_name: selectedPlan ? selectedPlan.plan_name : "",
          plan_fee: selectedPlan ? selectedPlan.plan_price : 0,
        };
      }

      if (name === "end_date") {
        return { ...prev, end_date: formatDateForServer(value) };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleNumericChange =
    (field: "plan_fee" | "installation_fee") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const numericValue = parseFloat(e.target.value);
      if (!isNaN(numericValue) && numericValue >= 0) {
        setFormData((prev) => ({ ...prev, [field]: numericValue }));
      }
    };

  const handleUpdateClient = async () => {
    if (!hasChanges()) {
      setAlert({ type: "danger", message: "No changes detected." });
      return;
    }

    const validationMsg = getValidationMessage();
    if (validationMsg) {
      setAlert({ type: "danger", message: validationMsg });
      return;
    }

    // Always include router_id and secret so the backend can do SSH correctly
    let changes: Partial<FormData> = {
      ...getChangedFields(),
      router_id: formData.router_id,
      secret: formData.secret,
    };

    // Auto-activate when extending end_date into the future
    if (changes.end_date) {
      const endDateMoment = moment.tz(
        changes.end_date,
        "YYYY-MM-DD HH:mm:ss",
        "Africa/Nairobi"
      );
      if (
        endDateMoment.isAfter(moment.tz("Africa/Nairobi")) &&
        formData.active !== 1
      ) {
        changes = { ...changes, active: 1 };
        console.log("End date is in the future — automatically setting active to 1.");
      }
    }

    setLoading(true);

    try {
      console.log("Sending changes:", changes);

      const response = await fetch(`/backend/edit-pppoe-client/${client_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(changes),
      });

      if (response.ok) {
        postLocalLog(
          `${user.name} edited PPPoE client with ID ${client_id} & Phone Number ${formData.phone_number}`,
          user,
          formData.router_id
        );

        const updatedFormData = {
          ...formData,
          ...(changes.active === 1 && { active: 1 }),
        };

        setOriginalData(updatedFormData);
        setFormData(updatedFormData);
        setOriginalRouterId(updatedFormData.router_id);
        setRouterChanged(false);

        setAlert({ type: "success", message: "Client updated successfully!" });
        setTimeout(() => setAlert(null), 5000);
      } else {
        const errorData = await response.json();
        console.error("Failed to update client:", errorData);
        setAlert({ type: "danger", message: "Failed to update client." });
      }
    } catch (error) {
      console.error("Error updating client:", error);
      setAlert({ type: "danger", message: "An error occurred while updating the client." });
    }

    setLoading(false);
  };

  const resetForm = () => {
    if (originalData) {
      setFormData({ ...originalData });
      setRouterChanged(false);
      if (originalData.router_id) fetchPlans(originalData.router_id);
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────

  if (loading && !originalData) {
    return (
      <Container fluid className="mb-4">
        <div className="text-center p-4">Loading...</div>
      </Container>
    );
  }

  const validationMessage = getValidationMessage();

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

      <Row className="g-3">

        {/* ── Personal details ── */}
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

        <Col sm="6">
          <Label>SMS Group</Label>
          <Input
            type="text"
            name="sms_group"
            value={formData.sms_group}
            onChange={handleInputChange}
          />
        </Col>

        {/* ── Subscription ── */}
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
            value={formatDateForInput(formData.end_date)}
            onChange={handleInputChange}
            min={currentYearStart}
          />
        </Col>

        {/* ── Router ── */}
        <Col sm="6">
          <Label>
            Router
            {routerChanged && (
              <span className="text-warning ms-2 small fw-semibold">
                ⚠ Changed — select a new plan below
              </span>
            )}
          </Label>
          <Input
            type="select"
            name="router_id"
            value={formData.router_id}
            onChange={handleInputChange}
          >
            <option value="">Select Router</option>
            {routers.map((r) => (
              <option key={r.id} value={r.id}>
                {r.router_name}
              </option>
            ))}
          </Input>
        </Col>

        {/* ── Plan — depends on selected router ── */}
        <Col sm="6">
          <Label>
            Plan
            {routerChanged && (
              <span className="text-danger ms-2 small fw-semibold">
                * Required — pick a plan for the new router
              </span>
            )}
          </Label>
          <Input
            type="select"
            name="plan_id"
            value={formData.plan_id}
            onChange={handleInputChange}
            disabled={plansLoading || !formData.router_id}
            invalid={routerChanged && formData.plan_id === 0}
          >
            <option value={0}>
              {plansLoading
                ? "Loading plans..."
                : routerChanged
                ? "— Select a new plan —"
                : "Select Plan"}
            </option>
            {pppoePlans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.plan_name} — Kes. {plan.plan_price}
              </option>
            ))}
          </Input>
        </Col>

        {/* ── Fees ── */}
        <Col sm="6">
          <Label>Plan Fee</Label>
          <Input
            type="number"
            name="plan_fee"
            value={formData.plan_fee}
            onChange={handleNumericChange("plan_fee")}
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
            onChange={handleNumericChange("installation_fee")}
            min="0"
            step="0.01"
          />
        </Col>

        {/* ── Other ── */}
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

        {/* ── Validation banner ── */}
        {validationMessage && (
          <Col sm="12">
            <div className="alert alert-warning py-2 mb-0" role="alert">
              ⚠ {validationMessage}
            </div>
          </Col>
        )}

        {/* ── Actions ── */}
        <Col sm="12" className="d-flex gap-2">
          <Button
            color="primary"
            onClick={handleUpdateClient}
            disabled={loading || !hasChanges() || !isValid()}
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
        </Col>

      </Row>
    </Container>
  );
};

export default EditClient;