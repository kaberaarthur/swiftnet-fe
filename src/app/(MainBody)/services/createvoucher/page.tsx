'use client';
import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Button,
  Alert,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import { postLocalLog } from '../../logservice/logService';
import config from '../../config/config.json';
import Cookies from 'js-cookie';

interface HotspotPlan {
  id: number;
  plan_name: string;
  limit_type: string;
  data_limit: number;
  bandwidth: number;
  plan_price: string;
  shared_users: number;
  plan_validity: number;
  router_name: string;
  company_username: string;
  company_id: number;
  router_id: number;
  date_created: string;
  validity_readable?: string;
  expired?: boolean;
  plan_type: "basic" | "premium" | "offer";
}

interface Router {
  id: number;
  router_name: string;
}

const CreateVouchers: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const accessToken = Cookies.get('accessToken') || localStorage.getItem('accessToken');

  const [hotspotPlans, setHotspotPlans] = useState<HotspotPlan[]>([]);
  const [allHotspotPlans, setAllHotspotPlans] = useState<HotspotPlan[]>([]);
  const [routerList, setRouterList] = useState<Router[]>([]);
  const [loading, setLoading] = useState(true);

  const [creatingVoucher, setCreatingVoucher] = useState(false);
  const [voucherResult, setVoucherResult] = useState<any>(null);  // ⭐ Voucher result here

  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertColor, setAlertColor] = useState<'success' | 'danger'>('success');
  const [visible, setVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [selectedRouterId, setSelectedRouterId] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<HotspotPlan | null>(null);
  const [customerPhone, setCustomerPhone] = useState('');

  // Copy to clipboard helper
  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  function formatValidity(hours: number | string): string {
    const totalHours = typeof hours === 'string' ? parseFloat(hours) : hours;
    const weeks = Math.floor(totalHours / 168);
    const days = Math.floor((totalHours % 168) / 24);
    const remainingHours = Math.floor(totalHours % 24);
    const parts: string[] = [];
    if (weeks > 0) parts.push(`${weeks} Week${weeks !== 1 ? 's' : ''}`);
    if (days > 0) parts.push(`${days} Day${days !== 1 ? 's' : ''}`);
    if (remainingHours > 0) parts.push(`${remainingHours} Hour${remainingHours !== 1 ? 's' : ''}`);
    return parts.join(' ');
  }

  // Fetch routers
  useEffect(() => {
    if (!user?.company_id) return;

    fetch(`${config.baseUrl}/routers?company_id=${user.company_id}`)
      .then(r => r.json())
      .then(setRouterList)
      .catch(console.error);
  }, [user?.company_id]);

  // Fetch hotspot plans
  useEffect(() => {
    if (!user?.company_id) return;

    const url = `${config.baseUrl}/hotspot-plans-v2?company_id=${user.company_id}`;

    const load = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const merged: HotspotPlan[] = [
          ...data.offers.map((p: any) => ({ ...p, plan_type: "offer" })),
          ...data.premium.map((p: any) => ({ ...p, plan_type: "premium" })),
          ...data.basic.map((p: any) => ({ ...p, plan_type: "basic" })),
        ];

        setAllHotspotPlans(merged);
        setHotspotPlans(merged);
      } catch (e) {
        console.error("Plan fetch error:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user?.company_id]);

  // Filter by router
  useEffect(() => {
    if (selectedRouterId) {
      setHotspotPlans(allHotspotPlans.filter(plan => plan.router_id === selectedRouterId));
    } else {
      setHotspotPlans(allHotspotPlans);
    }
    setCurrentPage(1);
  }, [selectedRouterId, allHotspotPlans]);

  const indexOfLast = currentPage * itemsPerPage;
  const currentData = hotspotPlans.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(hotspotPlans.length / itemsPerPage);

  const handleCreateVoucherClick = (plan: HotspotPlan) => {
    setSelectedPlan(plan);
    setVoucherResult(null); // Reset results
    setCustomerPhone('');
    setModalOpen(true);
  };

  // ⭐ UPDATED — voucher now returns result + stays inside modal
  const handleCreateVoucher = async () => {
    if (!customerPhone.trim()) {
      setAlertColor('danger');
      setAlertMessage('Please enter a customer phone number.');
      setVisible(true);
      return;
    }

    setCreatingVoucher(true);
    try {
      const response = await fetch(`${config.baseUrl}/hotspot-action/create-voucher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          plan_id: selectedPlan?.id,
          customer: customerPhone,
        }),
      });

      if (!response.ok) throw new Error("Creation failed");

      const result = await response.json();
      console.log("Voucher Creation Result:", result.data);
      setVoucherResult(result.data);   // ⭐ Store voucher result for display

      postLocalLog("Created a voucher", user, user.name);

      setAlertColor('success');
      setAlertMessage("Voucher created successfully!");
      setVisible(true);

    } catch (e) {
      console.error(e);
      setAlertColor('danger');
      setAlertMessage("Error creating voucher.");
      setVisible(true);
    } finally {
      setCreatingVoucher(false);
    }
  };

  if (loading) return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <Spinner />
    </Container>
  );

  return (
    <>
      <Breadcrumbs mainTitle={'Create Vouchers'} parent={''} />
      <Container fluid>

        <Alert color={alertColor} isOpen={visible} toggle={() => setVisible(false)}>
          {alertMessage}
        </Alert>

        {/* Table + Filters */}
        <Row className="align-items-center mb-3">
          <Col sm="6">
            <Label>Router</Label>
            <select
              className="form-select"
              value={selectedRouterId ?? ""}
              onChange={(e) => setSelectedRouterId(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Routers</option>
              {routerList.map(r => (
                <option key={r.id} value={r.id}>{r.router_name}</option>
              ))}
            </select>
          </Col>
        </Row>

        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-900 text-primary">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Router</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Users</th>
              <th className="px-4 py-2">Validity</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(plan => (
              <tr key={plan.id} className="border-b">
                <td className="px-4 py-2">{plan.id}</td>
                <td className="px-4 py-2">{plan.plan_name}</td>
                <td className="px-4 py-2">{plan.router_name}</td>
                <td className="px-4 py-2">{plan.plan_price}</td>
                <td className="px-4 py-2">{plan.shared_users}</td>
                <td className="px-4 py-2">{formatValidity(plan.plan_validity)}</td>

                <td className="px-4 py-2 text-center">
                  <Button color="success" size="sm" onClick={() => handleCreateVoucherClick(plan)}>
                    Create Voucher
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </Container>

      {/* ------------------- MODAL ------------------- */}
      <Modal isOpen={modalOpen} centered>
        <ModalHeader toggle={() => setModalOpen(false)}>Create Voucher</ModalHeader>

        <ModalBody>

          {/* Selected Plan Info */}
          {selectedPlan && !voucherResult && (
            <div className="mb-3">
              <p><strong>Plan:</strong> {selectedPlan.plan_name}</p>
              <p className="text-muted">
                {formatValidity(selectedPlan.plan_validity)} • KES {selectedPlan.plan_price}
              </p>
            </div>
          )}

          {/* Phone Input (only show before success) */}
          {!voucherResult && (
            <>
              <Label>Customer Phone Number *</Label>
              <Input
                type="text"
                placeholder="07xxxxxxxx"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </>
          )}

          {/* ⭐ SUCCESS UI WITH VOUCHER CODE + COPY */}
          {voucherResult && (
            <div className="mt-3 p-3 bg-light rounded">
              <h5 className="mb-3 text-success">Voucher Created ✔</h5>

              <p><strong>Voucher Code:</strong></p>

              <div className="d-flex align-items-center gap-2">
                <Input value={voucherResult.voucher_code} readOnly />

                <Button
                  color="primary"
                  onClick={() => copyText(voucherResult.voucher_code)}
                >
                  Copy
                </Button>
              </div>

              <p className="mt-3 text-muted">
                Send this code to the customer to log in to the hotspot.
              </p>
            </div>
          )}

        </ModalBody>

        <ModalFooter>

          {!voucherResult && (
            <>
              <Button color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>

              <Button color="primary" onClick={handleCreateVoucher} disabled={creatingVoucher}>
                {creatingVoucher ? <Spinner size="sm" /> : "Create Voucher"}
              </Button>
            </>
          )}

          {voucherResult && (
            <Button color="success" onClick={() => setModalOpen(false)}>
              Done
            </Button>
          )}

        </ModalFooter>
      </Modal>
    </>
  );
};

export default CreateVouchers;
