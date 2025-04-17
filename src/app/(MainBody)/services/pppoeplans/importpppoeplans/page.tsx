'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
// Assuming RootState is correctly defined elsewhere to include user: { company_id: number | null | undefined }
import { RootState } from '../../../../../Redux/Store';
import Link from 'next/link';

// Interface for the data fetched directly from /backend/routers
interface Router {
  id: number;
  router_name: string;
  company_id: number; // Assuming this is always a number from the backend
}

// Interface for the data fetched directly from the router API
interface RouterPPPOEPlan {
  id: number; // Assuming plan ID comes from the router API
  is_default: boolean;
  name: string;
  rate_limit: string;
  use_ipv6: string;
  use_encryption: string;
  use_compression: string;
}

// Interface for the plans being prepared for import (includes additional fields)
interface ImportPPPOEPlan extends RouterPPPOEPlan {
  plan_price: string;       // Added field
  plan_validity: string;    // Added field
  router_id: number;        // Added field (ID of the selected router)
  company_id: number;       // Added field (Ensured to be number)
  company_username: string;       // Added field (Ensured to be number)
  brand: string;            // Added field
  is_selected: boolean;     // Added field for UI selection state
}

const ImportPPPoEPlans: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // Items per page

  const [loading, setLoading] = useState<boolean>(false); // Start false until an action triggers loading
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<ImportPPPOEPlan[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<number>(0); // Use 0 or null/undefined for "not selected" state
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [bulkPrice, setBulkPrice] = useState<string>('');
  const [bulkValidity, setBulkValidity] = useState<string>('30'); // Default 30 days
  const [bulkBrand, setBulkBrand] = useState<string>('');

  // Get user from Redux
  const user = useSelector((state: RootState) => state.user);

  // Fetch routers based on the company_id from Redux user state
  useEffect(() => {
    // Only fetch if company_id exists
    if (user?.company_id) {
      setLoading(true); // Set loading true when starting fetch
      const fetchRouters = async () => {
        try {
          // Ensure the backend URL is correct (relative or absolute)
          const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
          if (!routerResponse.ok) {
            throw new Error(`HTTP error! status: ${routerResponse.status}`);
          }
          const routerData: Router[] = await routerResponse.json();
          setRouters(routerData);
          setErrorMessage(''); // Clear previous errors
        } catch (error) {
          console.error('Error fetching routers:', error);
          setErrorMessage('Failed to fetch routers. Please check network or backend.');
          setRouters([]); // Clear routers on error
        } finally {
          setLoading(false); // Set loading false when fetch completes or fails
        }
      };
      fetchRouters();
    } else {
        // Handle case where user has no company_id
        setLoading(false);
        setRouters([]);
        // Optionally set an error/info message:
        // setErrorMessage("Cannot fetch routers: User company ID is missing.");
    }
    // Depend on user.company_id - if it changes, refetch routers
  }, [user?.company_id]);

  // Load plans based on selected router
  useEffect(() => {
    // Only fetch if a router is selected (selectedRouter is not 0/null/undefined)
    if (selectedRouter) {
      setLoading(true); // Set loading true when starting fetch
      setErrorMessage(''); // Clear previous errors
      setPppoePlans([]); // Clear previous plans

      const fetchPPPoEPlans = async () => {
        try {
          // Find the selected router object to potentially get its company_id
          // Note: router's company_id might differ from user's, handle as needed
          const selectedRouterObj = routers.find(r => r.id === selectedRouter);

          // Fetch plans from the specific router API - ENSURE THIS URL IS CORRECT AND ACCESSIBLE
          // Using localhost:8000 might only work during local development.
          // Consider making this URL configurable or relative if needed.
          const plansResponse = await fetch('http://localhost:8000/router-pppoe-plans'); // Example URL

          if (!plansResponse.ok) {
            // Handle specific HTTP errors if possible
             if (plansResponse.status === 404) {
                 throw new Error('Router API endpoint not found (404).');
             }
             throw new Error(`HTTP error fetching plans! status: ${plansResponse.status}`);
          }
          const plansData: RouterPPPOEPlan[] = await plansResponse.json();

          // --- Start of Corrected Transformation Logic ---
          const transformedPlans: ImportPPPOEPlan[] = plansData
            .map(plan => {
              // Determine the company_id: Prioritize selected router's ID, fall back to user's ID
              // Use nullish coalescing (??) for safer fallback
              const companyIdValue = selectedRouterObj?.company_id ?? user?.company_id;
              const companyUsernameValue = user?.company_username;

              // Check if the resolved companyId is a valid number
              if (typeof companyIdValue !== 'number') {
                // Log an error and skip this plan if company_id cannot be determined
                console.error(
                  `Could not determine a valid company_id for plan '${plan.name}' (ID: ${plan.id}). Router ID: ${selectedRouter}, User Company ID: ${user?.company_id}. Skipping this plan.`
                );
                return null; // Mark for filtering
              }

              // If validation passes, create the ImportPPPOEPlan object
              return {
                ...plan, // Spread properties from RouterPPPOEPlan
                plan_price: '', // Default empty price
                plan_validity: '30', // Default 30 days validity
                router_id: selectedRouter, // ID of the router these plans came from
                company_id: companyIdValue, // Assign the validated company ID (guaranteed number)
                company_username: companyUsernameValue,
                brand: '', // Default empty brand
                is_selected: true // Default to selected for import
              };
            })
            // Filter out any plans that returned null due to missing company_id
            .filter((plan): plan is ImportPPPOEPlan => plan !== null);
          // --- End of Corrected Transformation Logic ---

          setPppoePlans(transformedPlans);

        } catch (error: any) { // Catch specific errors if needed
          console.error('Error fetching or processing PPPoE plans:', error);
          // Provide more specific error messages based on the error type if possible
          setErrorMessage(`Failed to fetch/process PPPoE plans: ${error.message || 'Check router API/network.'}`);
          setPppoePlans([]); // Clear plans on error
        } finally {
          setLoading(false); // Set loading false when fetch completes or fails
        }
      };
      fetchPPPoEPlans();
    } else {
      // If no router is selected, clear the plans
      setPppoePlans([]);
    }
    // Dependencies: fetch when selectedRouter changes, or when routers/user data potentially updates
  }, [selectedRouter, routers, user?.company_id]);

  // --- Pagination Calculations ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = pppoePlans.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pppoePlans.length / itemsPerPage);

  // Handle page changes
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  // --- Plan Selection Handlers ---
  // Toggle selection for a single plan
  const togglePlanSelection = (id: number) => {
    setPppoePlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === id ? { ...plan, is_selected: !plan.is_selected } : plan
      )
    );
  };

  // Toggle selection for ALL plans currently loaded (might need adjustment if only for current page)
  const toggleAllSelection = () => {
    // Check if ALL plans in the full list are currently selected
    const allSelected = pppoePlans.length > 0 && pppoePlans.every(plan => plan.is_selected);
    setPppoePlans(prevPlans =>
      prevPlans.map(plan => ({ ...plan, is_selected: !allSelected }))
    );
    // Note: If you only want to toggle all on the *current page*, filter `currentData` instead.
  };

  // --- Update Handlers ---
  // Update a specific field for a single plan
  const updatePlanField = (id: number, field: keyof ImportPPPOEPlan, value: string) => {
    setPppoePlans(prevPlans =>
      prevPlans.map(plan =>
        plan.id === id ? { ...plan, [field]: value } : plan
      )
    );
  };

  // Apply bulk update to all *selected* plans
  const applyBulkUpdate = (field: 'plan_price' | 'plan_validity' | 'brand', value: string) => {
    if (value === null || value === undefined) return; // Don't apply null/undefined values
    setPppoePlans(prevPlans =>
      prevPlans.map(plan =>
        plan.is_selected ? { ...plan, [field]: value } : plan
      )
    );
  };

  // Handle the final "Apply to Selected" button click for bulk fields
  const handleApplyBulkFields = () => {
    // Re-apply based on current bulk input values. Use applyBulkUpdate for consistency.
    // Check if values exist before applying to avoid overwriting with empty strings unintentionally
    // unless that is desired behavior.
    if (bulkPrice) applyBulkUpdate('plan_price', bulkPrice);
    if (bulkValidity) applyBulkUpdate('plan_validity', bulkValidity);
    if (bulkBrand) applyBulkUpdate('brand', bulkBrand);
  };


  // --- Validation and Import ---
  // Check if all required fields (price, validity, brand) are filled for *selected* plans
  const areRequiredFieldsFilled = () => {
    // Find the first selected plan that is missing a required field
    const missingField = pppoePlans.find(plan =>
        plan.is_selected && (!plan.plan_price || !plan.plan_validity || !plan.brand)
    );
    // If no such plan is found, all selected plans have required fields filled
    return !missingField;
  };

    // Check if at least one plan is selected
    const isAnyPlanSelected = () => {
        return pppoePlans.some(plan => plan.is_selected);
    };

  // Handle the import plans action
  const handleImportPlans = () => {
    const selectedPlans = pppoePlans.filter(plan => plan.is_selected);

    // Clear previous error messages
    setErrorMessage('');

    if (selectedPlans.length === 0) {
      setErrorMessage('Please select at least one plan to import.');
      return;
    }

    if (!areRequiredFieldsFilled()) {
      setErrorMessage('Please fill in all required fields (Price, Validity, Brand) for the selected plans.');
      return;
    }

    // If validation passes:
    console.log('Importing Plans Data:', selectedPlans);
    setLoading(true); // Indicate processing

    // --- !!! Placeholder for API call !!! ---
    // Replace this with your actual API call to your backend to save the plans
    // Example using fetch:
    
    fetch('/backend/router-import-pppoe-plans', { // Your actual import endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add Authorization headers if needed
      },
      body: JSON.stringify(selectedPlans),
    })
    .then(response => {
      if (!response.ok) {
        // Handle non-successful responses (e.g., server errors)
        return response.json().then(err => { throw new Error(err.message || 'Import failed') });
      }
      return response.json(); // Or handle success response as needed
    })
    .then(data => {
      console.log('Import successful:', data);
      alert(`Successfully imported ${selectedPlans.length} plans.`);
      // Optionally: Clear selection, navigate away, or refresh data
      setPppoePlans(plans => plans.map(p => ({ ...p, is_selected: false }))); // Deselect after import
      setSelectedRouter(0); // Reset router selection
    })
    .catch(error => {
      console.error('Error importing plans:', error);
      setErrorMessage(`Import failed: ${error.message}`);
    })
    .finally(() => {
      setLoading(false); // Stop loading indicator
    });
    

    // --- Remove this placeholder alert when API call is implemented ---
    /*
    setTimeout(() => { // Simulate network delay
        alert(`Successfully prepared ${selectedPlans.length} plans for import. (API call placeholder)`);
        setLoading(false);
         // Optionally clear selection or navigate
        setPppoePlans(plans => plans.map(p => ({ ...p, is_selected: false })));
        setSelectedRouter(0);
    }, 2000);
    */
    // --- End Placeholder ---
  };

  // --- JSX Rendering ---
  return (
    <div className="overflow-x-auto pt-4">
      <h2 className="text-xl font-bold mb-4">Import PPPoE Plans from Router</h2>

      {/* Error Message Area */}
      {errorMessage && (
        <Alert color="danger" className="mb-4" toggle={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      {/* Top Controls: Back Button and Router Selection */}
      <div className="py-2">
        <Row className="align-items-end">
          <Col md="6" className="mb-3">
             <Link href="/services/pppoeplans" passHref>
                 <Button color="secondary" className="px-4 py-2">
                    <i className="bi bi-arrow-left mr-2"></i> Back to Plans List
                 </Button>
            </Link>
          </Col>
          <Col md="6" className="mb-3">
            <Label htmlFor="routerSelect">{'Select Router to Import From'}</Label>
            <Input
              id="routerSelect"
              type="select"
              value={selectedRouter || ''}
              onChange={(e) => setSelectedRouter(Number(e.target.value))}
              disabled={loading || routers.length === 0} // Disable if loading or no routers fetched
            >
              <option value="">{loading ? 'Loading routers...' : routers.length === 0 ? 'No routers found' : '-- Select a Router --'}</option>
              {routers.map(router => (
                <option key={router.id} value={router.id}>
                  {router.router_name} (ID: {router.id})
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </div>

       {/* Bulk Update Section - Show only when a router is selected */}
       {selectedRouter > 0 && pppoePlans.length > 0 && (
        <div className="bg-light p-4 mb-4 rounded border">
            <h3 className="text-lg font-semibold mb-3">Bulk Update Selected Plans</h3>
            <Row>
            <Col sm="4" className="mb-2">
                <Label htmlFor="bulkPrice">Plan Price ($)</Label>
                <Input
                id="bulkPrice"
                type="number"
                min="0"
                step="0.01"
                value={bulkPrice}
                onChange={(e) => setBulkPrice(e.target.value)}
                placeholder="Set price"
                disabled={loading}
                />
            </Col>
            <Col sm="4" className="mb-2">
                <Label htmlFor="bulkValidity">Plan Validity (days)</Label>
                <Input
                id="bulkValidity"
                type="number"
                min="1"
                step="1"
                value={bulkValidity}
                onChange={(e) => setBulkValidity(e.target.value)}
                placeholder="Set validity"
                disabled={loading}
                />
            </Col>
            <Col sm="4" className="mb-2">
                <Label htmlFor="bulkBrand">Brand</Label>
                <Input
                id="bulkBrand"
                type="text"
                value={bulkBrand}
                onChange={(e) => setBulkBrand(e.target.value)}
                placeholder="Set brand"
                disabled={loading}
                />
            </Col>
            </Row>
            <Button
            color="primary"
            className="mt-3"
            onClick={handleApplyBulkFields} // Use the dedicated handler
            disabled={loading || !isAnyPlanSelected()} // Disable if no plans are selected
            >
             <i className="bi bi-check-square mr-2"></i> Apply to Selected
            </Button>
            <small className="d-block mt-2 text-muted">Applies the above values to all currently selected plans.</small>
        </div>
        )}

      {/* Plans Table Area */}
      {loading && selectedRouter > 0 && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading plans...</span>
          </div>
          <p className="mt-2">Loading plans from router...</p>
        </div>
      )}

      {!loading && selectedRouter > 0 && pppoePlans.length > 0 && (
        <>
          <div className="table-responsive"> {/* Added for better small screen handling */}
            <table className="table table-hover table-bordered table-striped"> {/* Using Bootstrap table classes */}
                <thead className="table-light">
                <tr>
                    <th style={{ width: '5%' }}> {/* Checkbox column */}
                    <Input
                        type="checkbox"
                        aria-label="Select all plans"
                        checked={pppoePlans.length > 0 && pppoePlans.every(p => p.is_selected)}
                        onChange={toggleAllSelection}
                        disabled={loading}
                    />
                    </th>
                    <th style={{ width: '5%' }}>ID</th>
                    <th>Plan Name</th>
                    <th>Rate Limit</th>
                    <th style={{ width: '15%' }}>Plan Price ($)*</th>
                    <th style={{ width: '15%' }}>Validity (days)*</th>
                    <th style={{ width: '15%' }}>Brand*</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((plan) => (
                    <tr key={plan.id} className={plan.is_selected ? 'table-active' : ''}>
                    <td>
                        <Input
                        type="checkbox"
                        aria-label={`Select plan ${plan.name}`}
                        checked={plan.is_selected}
                        onChange={() => togglePlanSelection(plan.id)}
                        disabled={loading}
                        />
                    </td>
                    <td>{plan.id}</td>
                    <td>{plan.name}</td>
                    <td>{plan.rate_limit}</td>
                    <td>
                        <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={plan.plan_price}
                        onChange={(e) => updatePlanField(plan.id, 'plan_price', e.target.value)}
                        disabled={!plan.is_selected || loading}
                        // Highlight if selected but empty
                        className={!plan.plan_price && plan.is_selected ? 'is-invalid' : ''}
                        />
                    </td>
                    <td>
                        <Input
                        type="number"
                        min="1"
                        step="1"
                        value={plan.plan_validity}
                        onChange={(e) => updatePlanField(plan.id, 'plan_validity', e.target.value)}
                        disabled={!plan.is_selected || loading}
                        className={!plan.plan_validity && plan.is_selected ? 'is-invalid' : ''}
                        />
                    </td>
                    <td>
                        <Input
                        type="text"
                        value={plan.brand}
                        onChange={(e) => updatePlanField(plan.id, 'brand', e.target.value)}
                        disabled={!plan.is_selected || loading}
                        className={!plan.brand && plan.is_selected ? 'is-invalid' : ''}
                        />
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                    <Button
                    color="secondary"
                    outline
                    disabled={currentPage === 1 || loading}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="mb-2"
                    >
                    <i className="bi bi-chevron-left"></i> Previous
                    </Button>
                    <span className="text-muted mb-2">
                    Page {currentPage} of {totalPages} ({pppoePlans.length} total plans)
                    </span>
                    <Button
                    color="secondary"
                    outline
                    disabled={currentPage === totalPages || loading}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="mb-2"
                    >
                    Next <i className="bi bi-chevron-right"></i>
                    </Button>
                </div>
            )}

          {/* Import Action Area */}
          <div className="mt-4 pt-3 border-top">
            <p className="text-sm text-danger mb-2">* Price, Validity, and Brand are required fields for selected plans before importing.</p>
            <Button
              color="success"
              size="lg" // Make button larger
              className="px-5 py-2"
              onClick={handleImportPlans}
              disabled={loading || !isAnyPlanSelected() || !areRequiredFieldsFilled()} // Disable conditions
            >
              {loading ? (
                 <>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                    Importing...
                 </>
              ) : (
                 <> <i className="bi bi-cloud-upload mr-2"></i> Import Selected Plans </>
              )
            }

            </Button>
          </div>
        </>
      )}

      {/* Messages for initial/empty states */}
      {!loading && !selectedRouter && (
        <Alert color="info" className="text-center py-4">
            Please select a router from the dropdown above to view and import its PPPoE plans.
        </Alert>
      )}

      {!loading && selectedRouter > 0 && pppoePlans.length === 0 && !errorMessage && (
         <Alert color="warning" className="text-center py-4">
            No PPPoE plans were found on the selected router, or the API returned an empty list.
         </Alert>
      )}

    </div>
  );
};

export default ImportPPPoEPlans;