'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
// Assuming RootState is correctly defined elsewhere
import { RootState } from '../../../../../Redux/Store'; // Adjust path if necessary
import Link from 'next/link';

// Interface for the data fetched directly from /backend/routers
interface Router {
    id: number;
    router_name: string;
    company_id: number;
}

// Interface for the data fetched directly from the router API (e.g., /backend/router-pppoe-plans?id=X)
interface RouterPPPOEPlan {
    id: number; // Assuming plan ID comes from the router API
    is_default: boolean;
    name: string;
    rate_limit: string;
    use_ipv6: string;
    use_encryption: string;
    use_compression: string;
}

// Interface for the plans being prepared for import
interface ImportPPPOEPlan extends RouterPPPOEPlan {
    plan_price: string;
    plan_validity: string;
    router_id: number;
    company_id: number;
    company_username: string; // Assuming this comes from user state
    brand: string;
    is_selected: boolean;
}

const ImportPPPoEPlans: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const [loading, setLoading] = useState<boolean>(false); // General loading state
    const [routersLoading, setRoutersLoading] = useState<boolean>(false); // Specific for router fetch
    const [plansLoading, setPlansLoading] = useState<boolean>(false); // Specific for plan fetch

    const [routers, setRouters] = useState<Router[]>([]);
    const [pppoePlans, setPppoePlans] = useState<ImportPPPOEPlan[]>([]);
    const [selectedRouter, setSelectedRouter] = useState<number>(0); // 0 means no router selected
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [bulkPrice, setBulkPrice] = useState<string>('');
    const [bulkValidity, setBulkValidity] = useState<string>('30');
    const [bulkBrand, setBulkBrand] = useState<string>('');

    const user = useSelector((state: RootState) => state.user);

    // Effect 1: Fetch routers when component mounts or user's company_id changes
    useEffect(() => {
        if (user?.company_id) {
            setRoutersLoading(true); // Start loading routers
            setLoading(true); // Also set general loading? Optional, maybe just routersLoading is enough
            setErrorMessage('');
            setRouters([]); // Clear previous routers
            setSelectedRouter(0); // Reset selection when company changes
            setPppoePlans([]); // Clear plans when company changes

            const fetchRouters = async () => {
                try {
                    const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
                    if (!routerResponse.ok) {
                        throw new Error(`HTTP error fetching routers! status: ${routerResponse.status}`);
                    }
                    const routerData: Router[] = await routerResponse.json();
                    setRouters(routerData);
                    setErrorMessage('');

                    // --- NEW: Automatically select the first router if available ---
                    if (routerData && routerData.length > 0) {
                        setSelectedRouter(routerData[0].id); // Set the first router as selected
                        // Note: This state update will trigger the second useEffect to fetch plans
                    } else {
                        // No routers found, ensure no router is selected
                        setSelectedRouter(0);
                    }
                    // --- End NEW ---

                } catch (error) {
                    console.error('Error fetching routers:', error);
                    setErrorMessage('Failed to fetch routers. Please check network or backend.');
                    setRouters([]);
                    setSelectedRouter(0); // Ensure reset on error
                } finally {
                    setRoutersLoading(false);
                    setLoading(false); // Stop general loading if it was started
                }
            };
            fetchRouters();
        } else {
            // No company_id, clear everything
            setRouters([]);
            setPppoePlans([]);
            setSelectedRouter(0);
            setLoading(false);
            setRoutersLoading(false);
             // setErrorMessage("Cannot fetch routers: User company ID is missing."); // Optional message
        }
    }, [user?.company_id]); // Depend only on company_id

    // Effect 2: Fetch plans when selectedRouter changes (and is valid)
    useEffect(() => {
        // Only fetch if a router is selected (ID > 0)
        if (selectedRouter > 0) {
            setPlansLoading(true); // Start loading plans
            setLoading(true);
            setErrorMessage('');
            setPppoePlans([]); // Clear previous plans before fetching new ones

            const fetchPPPoEPlans = async () => {
                try {
                    // Find the selected router object (needed for company_id fallback)
                    const selectedRouterObj = routers.find(r => r.id === selectedRouter);

                    // --- MODIFIED: Fetch plans using the selected router's ID ---
                    const plansResponse = await fetch(`/backend/router-pppoe-plans?id=${selectedRouter}`);
                    // --- End MODIFIED ---

                    if (!plansResponse.ok) {
                        if (plansResponse.status === 404) {
                             throw new Error(`Plans endpoint not found for router ID ${selectedRouter} (404).`);
                        }
                         throw new Error(`HTTP error fetching plans! Status: ${plansResponse.status}`);
                    }
                    const plansData: RouterPPPOEPlan[] = await plansResponse.json();

                    const companyUsernameValue = user?.company_username ?? ''; // Get username safely

                    const transformedPlans: ImportPPPOEPlan[] = plansData
                        .map(plan => {
                            const companyIdValue = selectedRouterObj?.company_id ?? user?.company_id;

                            if (typeof companyIdValue !== 'number') {
                                console.error(
                                    `Could not determine a valid company_id for plan '${plan.name}' (ID: ${plan.id}). Router ID: ${selectedRouter}, User Company ID: ${user?.company_id}. Skipping.`
                                );
                                return null;
                            }

                            return {
                                ...plan,
                                plan_price: '',
                                plan_validity: '30',
                                router_id: selectedRouter, // Store the ID of the router these plans belong to
                                company_id: companyIdValue,
                                company_username: companyUsernameValue, // Add username
                                brand: '',
                                is_selected: true // Default to selected
                            };
                        })
                        .filter((plan): plan is ImportPPPOEPlan => plan !== null);

                    setPppoePlans(transformedPlans);
                    setCurrentPage(1); // Reset to first page when plans reload

                } catch (error: any) {
                    console.error('Error fetching or processing PPPoE plans:', error);
                    setErrorMessage(`Failed to fetch/process plans for router ID ${selectedRouter}: ${error.message || 'Check API/network.'}`);
                    setPppoePlans([]); // Clear plans on error
                } finally {
                    setPlansLoading(false);
                    setLoading(false);
                }
            };
            fetchPPPoEPlans();
        } else {
            // If no router is selected (selectedRouter is 0), clear the plans
            setPppoePlans([]);
            setPlansLoading(false); // Ensure plans loading is false if no router selected
            // Keep general loading based on router fetch if needed, or set false if appropriate
            if (!routersLoading) {
                 setLoading(false);
            }
        }
        // This effect depends *only* on the selectedRouter changing.
        // Routers list (`routers`) and user info are used *within* the effect if needed,
        // but the *trigger* should primarily be the router selection itself.
        // Including `routers` ensures `selectedRouterObj` is up-to-date if the list reloads
        // *before* a selection is made, but the main driver is `selectedRouter`.
    }, [selectedRouter, routers, user?.company_id, user?.company_username]); // Added username dependency


    // --- Pagination Calculations ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Ensure pppoePlans exists before slicing
    const currentData = pppoePlans ? pppoePlans.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPlans = pppoePlans?.length ?? 0;
    const totalPages = Math.ceil(totalPlans / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // --- Plan Selection Handlers ---
    const togglePlanSelection = (id: number) => {
        setPppoePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.id === id ? { ...plan, is_selected: !plan.is_selected } : plan
            )
        );
    };

    const toggleAllSelection = () => {
        const allSelected = totalPlans > 0 && pppoePlans.every(plan => plan.is_selected);
        setPppoePlans(prevPlans =>
            prevPlans.map(plan => ({ ...plan, is_selected: !allSelected }))
        );
    };

    // --- Update Handlers ---
    const updatePlanField = (id: number, field: keyof ImportPPPOEPlan, value: string) => {
        setPppoePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.id === id ? { ...plan, [field]: value } : plan
            )
        );
    };

    const applyBulkUpdate = (field: 'plan_price' | 'plan_validity' | 'brand', value: string) => {
        if (value === null || value === undefined) return;
        setPppoePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.is_selected ? { ...plan, [field]: value } : plan
            )
        );
    };

    const handleApplyBulkFields = () => {
        // Apply only if the bulk input fields have values
        if (bulkPrice) applyBulkUpdate('plan_price', bulkPrice);
        if (bulkValidity) applyBulkUpdate('plan_validity', bulkValidity);
        if (bulkBrand) applyBulkUpdate('brand', bulkBrand);
    };


    // --- Validation and Import ---
    const areRequiredFieldsFilled = () => {
        if (!pppoePlans) return true; // Or false if plans must exist? Decide based on logic.
        const missingField = pppoePlans.find(plan =>
            plan.is_selected && (!plan.plan_price || !plan.plan_validity || !plan.brand)
        );
        return !missingField;
    };

    const isAnyPlanSelected = () => {
        return pppoePlans && pppoePlans.some(plan => plan.is_selected);
    };

    const handleImportPlans = async () => { // Make async for await fetch
        const selectedPlans = pppoePlans.filter(plan => plan.is_selected);

        setErrorMessage('');

        if (selectedPlans.length === 0) {
            setErrorMessage('Please select at least one plan to import.');
            return;
        }

        if (!areRequiredFieldsFilled()) {
            setErrorMessage('Please fill in Price, Validity, and Brand for all selected plans.');
            return;
        }

        console.log('Importing Plans Data:', selectedPlans);
        setLoading(true); // Indicate processing

        try {
            const response = await fetch('/backend/router-import-pppoe-plans', { // Your actual import endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add Authorization headers if needed: 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(selectedPlans),
            });

            if (!response.ok) {
                // Try to parse error message from backend response
                let errorMsg = 'Import failed due to server error.';
                try {
                    const errData = await response.json();
                    errorMsg = errData.message || `Import failed with status: ${response.status}`;
                } catch (parseError) {
                    // If response is not JSON or empty
                    errorMsg = `Import failed with status: ${response.status}`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json(); // Or handle success response text/status
            console.log('Import successful:', data);
            alert(`Successfully imported ${selectedPlans.length} plans.`); // Consider using a more integrated notification system

            // Reset state after successful import
            setPppoePlans(plans => plans.map(p => ({ ...p, is_selected: false }))); // Deselect all
            setSelectedRouter(0); // Reset router selection, which will clear plans via useEffect
            // Optionally clear bulk fields
            setBulkPrice('');
            setBulkValidity('30');
            setBulkBrand('');

        } catch (error: any) {
            console.error('Error importing plans:', error);
            setErrorMessage(`Import failed: ${error.message}`);
        } finally {
            setLoading(false); // Stop loading indicator regardless of success/failure
        }
    };


    // --- JSX Rendering ---
    // Determine if *any* loading is happening
    const isLoading = loading || routersLoading || plansLoading;
    const noRoutersAvailable = !routersLoading && routers.length === 0;

    return (
        <div className="overflow-x-auto pt-4">
            <h2 className="text-xl font-bold mb-4">Import PPPoE Plans from Router</h2>

            {errorMessage && (
                <Alert color="danger" className="mb-4" toggle={() => setErrorMessage('')}>
                    {errorMessage}
                </Alert>
            )}

            {/* Top Controls */}
            <div className="py-2">
                <Row className="align-items-end">
                    <Col md="6" className="mb-3">
                        <Link href="/services/pppoeplans" passHref>
                            <Button color="secondary" className="px-4 py-2" disabled={isLoading}>
                                <i className="bi bi-arrow-left mr-2"></i> Back to Plans List
                            </Button>
                        </Link>
                    </Col>
                    <Col md="6" className="mb-3">
                        <Label htmlFor="routerSelect">{'Select Router to Import From'}</Label>
                        <Input
                            id="routerSelect"
                            type="select"
                            value={selectedRouter || ''} // Use selectedRouter state, fallback to '' for the placeholder
                            onChange={(e) => setSelectedRouter(Number(e.target.value))} // Update state on change
                            disabled={routersLoading || noRoutersAvailable || plansLoading} // Disable while loading routers/plans or if none exist
                        >
                            {/* Dynamic placeholder option */}
                            <option value="">
                                {routersLoading ? 'Loading routers...' : (noRoutersAvailable ? 'No routers found' : '-- Select a Router --')}
                            </option>
                            {/* List fetched routers */}
                            {routers.map(router => (
                                <option key={router.id} value={router.id}>
                                    {router.router_name} (ID: {router.id})
                                </option>
                            ))}
                        </Input>
                    </Col>
                </Row>
            </div>

             {/* Bulk Update Section - Show only when a router is selected AND plans are loaded */}
             {selectedRouter > 0 && !plansLoading && pppoePlans.length > 0 && (
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
                                disabled={isLoading} // Disable if any loading is true
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
                                disabled={isLoading}
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
                                disabled={isLoading}
                                />
                         </Col>
                     </Row>
                     <Button
                        color="primary"
                        className="mt-3"
                        onClick={handleApplyBulkFields}
                        disabled={isLoading || !isAnyPlanSelected()} // Disable if loading or no plans are selected
                        >
                         <i className="bi bi-check-square mr-2"></i> Apply to Selected
                     </Button>
                     <small className="d-block mt-2 text-muted">Applies the above values to all currently selected plans.</small>
                 </div>
             )}

            {/* Loading Indicator for Plans */}
            {plansLoading && selectedRouter > 0 && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading plans...</span>
                    </div>
                    <p className="mt-2">Loading plans from router...</p>
                </div>
            )}

            {/* Plans Table Area - Show only if NOT loading plans, a router IS selected, AND there are plans */}
            {!plansLoading && selectedRouter > 0 && pppoePlans.length > 0 && (
                <>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-striped">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: '5%' }}>
                                        <Input
                                            type="checkbox"
                                            aria-label="Select all plans"
                                            // Check if all plans in the *full* list (not just current page) are selected
                                            checked={totalPlans > 0 && pppoePlans.every(p => p.is_selected)}
                                            onChange={toggleAllSelection}
                                            disabled={isLoading} // Disable if any loading
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
                                {/* Render only the plans for the current page */}
                                {currentData.map((plan) => (
                                    <tr key={plan.id} className={plan.is_selected ? 'table-active' : ''}>
                                        <td>
                                            <Input
                                                type="checkbox"
                                                aria-label={`Select plan ${plan.name}`}
                                                checked={plan.is_selected}
                                                onChange={() => togglePlanSelection(plan.id)}
                                                disabled={isLoading}
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
                                                // Input is editable only if the plan is selected AND not loading
                                                disabled={!plan.is_selected || isLoading}
                                                // Add 'is-invalid' class if selected but field is empty
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
                                                disabled={!plan.is_selected || isLoading}
                                                className={!plan.plan_validity && plan.is_selected ? 'is-invalid' : ''}
                                            />
                                        </td>
                                        <td>
                                            <Input
                                                type="text"
                                                value={plan.brand}
                                                onChange={(e) => updatePlanField(plan.id, 'brand', e.target.value)}
                                                disabled={!plan.is_selected || isLoading}
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
                                disabled={currentPage === 1 || isLoading}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className="mb-2"
                             >
                                 <i className="bi bi-chevron-left"></i> Previous
                             </Button>
                             <span className="text-muted mb-2">
                                Page {currentPage} of {totalPages} ({totalPlans} total plans)
                             </span>
                             <Button
                                color="secondary"
                                outline
                                disabled={currentPage === totalPages || isLoading}
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
                            size="lg"
                            className="px-5 py-2"
                            onClick={handleImportPlans}
                            // Disable if loading, no plan selected, or required fields are missing in selected plans
                            disabled={isLoading || !isAnyPlanSelected() || !areRequiredFieldsFilled()}
                        >
                            {isLoading && !routersLoading && !plansLoading ? ( // Show specific "Importing..." only during the import action
                                <>
                                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                    Importing...
                                </>
                            ) : (
                                <> <i className="bi bi-cloud-upload mr-2"></i> Import Selected Plans </>
                            )}
                        </Button>
                    </div>
                </>
            )}

            {/* Informational Messages */}
            {/* Message when no router is selected yet (and routers aren't loading/failed) */}
            {!isLoading && !selectedRouter && routers.length > 0 && (
                 <Alert color="info" className="text-center py-4">
                     Please select a router from the dropdown above to view and import its PPPoE plans.
                 </Alert>
             )}

             {/* Message when a router is selected, plans are not loading, but no plans were found */}
             {!plansLoading && selectedRouter > 0 && pppoePlans.length === 0 && !errorMessage && (
                 <Alert color="warning" className="text-center py-4">
                     No PPPoE plans were found on the selected router, or the API returned an empty list.
                 </Alert>
             )}

              {/* Message when router fetch finished but found no routers */}
             {noRoutersAvailable && !errorMessage && (
                 <Alert color="warning" className="text-center py-4">
                     No routers associated with your company ID were found. Cannot import plans.
                 </Alert>
             )}


        </div>
    );
};

export default ImportPPPoEPlans;