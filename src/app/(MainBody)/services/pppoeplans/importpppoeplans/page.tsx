'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
// Assuming RootState is correctly defined elsewhere
import { RootState } from '../../../../../Redux/Store'; // Adjust path if necessary
import Link from 'next/link';
import Cookies from 'js-cookie'; // Import Cookies

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

import WarningModal from './WarningModal/WarningModal';


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
    brand: string; // This will store the selected brand name (string)
    is_selected: boolean;
}

interface PPPOEPlan {
    id: number;
    plan_name: string;
    plan_validity: number;
    plan_price: number;
    rate_limit_string: string;
    pool_name: string;
    router_id: string;
    brand: string;
  }

// Interface for Brand data
interface Brand {
    id: number;
    name: string;
    company_id: number;
}

const ImportPPPoEPlans: React.FC = () => {
    // State for the WarningModal
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

    // Initial check for the warning modal on component mount
    useEffect(() => {
        // Only open the modal if the user hasn't opted to hide it
        const hideModal = localStorage.getItem('hideWarningModal');
        if (hideModal !== 'true') {
            setIsWarningModalOpen(true);
        }
    }, []); // Empty dependency array means this runs once on mount

    const toggleWarningModal = () => setIsWarningModalOpen(!isWarningModalOpen);

    // Retrieve accessToken safely from Cookies or localStorage
    const [accessToken] = useState<string | null>(() => {
        return Cookies.get('accessToken') || localStorage.getItem('accessToken') || null;
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 20;

    const [brands, setBrands] = useState<Brand[]>([]); // State for storing fetched brands
    const [brandsLoading, setBrandsLoading] = useState<boolean>(false); // Loading state for brands fetch

    const [loading, setLoading] = useState<boolean>(false); // General loading state
    const [routersLoading, setRoutersLoading] = useState<boolean>(false); // Specific for router fetch
    const [plansLoading, setPlansLoading] = useState<boolean>(false); // Specific for plan fetch

    const [routers, setRouters] = useState<Router[]>([]);
    const [pppoePlans, setPppoePlans] = useState<ImportPPPOEPlan[]>([]);
    const [selectedRouter, setSelectedRouter] = useState<number>(0); // 0 means no router selected
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [bulkPrice, setBulkPrice] = useState<string>('');
    const [bulkValidity, setBulkValidity] = useState<string>('30');
    const [bulkBrand, setBulkBrand] = useState<string>(''); // This will store the selected brand *name* for bulk update

    const user = useSelector((state: RootState) => state.user);

    const [pppoePlansExisting, setPppoePlansExisting] = useState<PPPOEPlan[]>([]);

    function filterPlans() {
        // console.log("Original pppoePlans:", pppoePlans);
        // console.log("Original pppoePlansExisting:", pppoePlansExisting);
      
        // Create a Set of existing plan names for efficient lookup
        const existingPlanNames = new Set(pppoePlansExisting.map(plan => plan.plan_name));
      
        // Filter pppoePlans, keeping only those whose 'name' is NOT in existingPlanNames
        const filteredPppoePlans = pppoePlans.filter(plan => !existingPlanNames.has(plan.name));
      
        // Update pppoePlans with the filtered result
        setPppoePlans(filteredPppoePlans);
      
        console.log("Filtered pppoePlans (removed existing):", pppoePlans);
      }

    useEffect(() => {
        if (selectedRouter) {
          setLoading(true);
          const fetchPPPoEPlans = async () => {
            try {
              const plansResponse = await fetch(
                `/backend/pppoe-plans?router_id=${selectedRouter}&company_id=${user.company_id}&type=pppoe`
              );
              const plansData: PPPOEPlan[] = await plansResponse.json();
              setPppoePlansExisting(plansData);
            } catch (error) {
              console.error('Error fetching PPPoE plans:', error);
            } finally {
              setLoading(false);
            }
          };
          fetchPPPoEPlans();
        }
      }, [selectedRouter, user.company_id]);

    // Function to fetch brands
    const fetchBrands = async () => {
        if (!accessToken) {
            console.error('No access token found, cannot fetch brands.');
            setErrorMessage('Authentication error: Cannot fetch brands.'); // Optional: Inform user
            return;
        }
        setBrandsLoading(true); // Start loading brands
        // Consider setting general loading if needed: setLoading(true);
        try {
            const response = await fetch('/backend/brands', { // Use your actual brands endpoint
                headers: {
                    // --- MODIFIED: Added Authorization Header ---
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error fetching brands! status: ${response.status}`);
            }
            const data: Brand[] = await response.json();
            // Optionally filter brands by user.company_id if the backend doesn't do it
             // const filteredBrands = data.filter(brand => brand.company_id === user?.company_id);
             // setBrands(filteredBrands);
            setBrands(data); // Assuming backend returns brands for the correct company
        } catch (error) {
            console.error('Failed to fetch brands:', error);
            setErrorMessage('Failed to load brand list.'); // Inform user
            setBrands([]); // Clear brands on error
        } finally {
            setBrandsLoading(false); // Stop loading brands
            // setLoading(false); // Stop general loading if started
        }
    };


    // Effect 1: Fetch routers when component mounts or user's company_id changes
    useEffect(() => {
        if (user?.company_id) {
            setRoutersLoading(true);
            setLoading(true);
            setErrorMessage('');
            setRouters([]);
            setSelectedRouter(0);
            setPppoePlans([]);

            const fetchRouters = async () => {
                try {
                    // Assuming fetch needs Auth token too? If so, add headers like in fetchBrands
                    const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`, {
                        headers: { 'Authorization': `Bearer ${accessToken}` } // Example: Add if needed
                    });
                    if (!routerResponse.ok) {
                        throw new Error(`HTTP error fetching routers! status: ${routerResponse.status}`);
                    }
                    const routerData: Router[] = await routerResponse.json();
                    setRouters(routerData);
                    setErrorMessage('');

                    if (routerData && routerData.length > 0) {
                        setSelectedRouter(routerData[0].id);
                    } else {
                        setSelectedRouter(0);
                    }
                } catch (error) {
                    console.error('Error fetching routers:', error);
                    setErrorMessage('Failed to fetch routers.');
                    setRouters([]);
                    setSelectedRouter(0);
                } finally {
                    setRoutersLoading(false);
                    setLoading(false);
                }
            };
            fetchRouters();
        } else {
            setRouters([]);
            setPppoePlans([]);
            setSelectedRouter(0);
            setLoading(false);
            setRoutersLoading(false);
        }
        // Refetch routers if accessToken changes *and* company_id exists
    }, [user?.company_id, accessToken]);

    // Effect 2: Fetch Brands on mount or if accessToken changes
    useEffect(() => {
        fetchBrands();
        // Dependency: accessToken ensures refetch if token changes (e.g., re-login)
    }, [accessToken]);

    // Effect 3: Fetch plans when selectedRouter changes (and is valid)
    useEffect(() => {
        if (selectedRouter > 0 && accessToken) { // Check for token here too if needed for fetch
            setPlansLoading(true);
            setLoading(true);
            setErrorMessage('');
            setPppoePlans([]);

            const fetchPPPoEPlans = async () => {
                try {
                    const selectedRouterObj = routers.find(r => r.id === selectedRouter);
                    // --- MODIFIED URL REMAINS ---
                    const plansResponse = await fetch(`/backend/router-pppoe-profiles?id=${selectedRouter}`, {
                         headers: { 'Authorization': `Bearer ${accessToken}` } // Example: Add if needed
                    });

                    if (!plansResponse.ok) {
                         if (plansResponse.status === 404) {
                              throw new Error(`Plans endpoint not found for router ID ${selectedRouter} (404).`);
                         }
                          throw new Error(`HTTP error fetching plans! Status: ${plansResponse.status}`);
                    }
                    const plansData: RouterPPPOEPlan[] = await plansResponse.json();

                    const companyUsernameValue = user?.company_username ?? '';

                    const transformedPlans: ImportPPPOEPlan[] = plansData
                        .map(plan => {
                            const companyIdValue = selectedRouterObj?.company_id ?? user?.company_id;

                            if (typeof companyIdValue !== 'number') {
                                console.error(
                                    `Could not determine a valid company_id for plan '${plan.name}' (ID: ${plan.id}). Skipping.`
                                );
                                return null;
                            }

                            return {
                                ...plan,
                                plan_price: '',
                                plan_validity: '30',
                                router_id: selectedRouter,
                                company_id: companyIdValue,
                                company_username: companyUsernameValue,
                                brand: '', // Initialize brand as empty string (will select the default option)
                                is_selected: true
                            };
                        })
                        .filter((plan): plan is ImportPPPOEPlan => plan !== null);

                    setPppoePlans(transformedPlans);
                    setCurrentPage(1);

                    console.log("Plans from the Router: ", pppoePlans);

                } catch (error: any) {
                    console.error('Error fetching or processing PPPoE plans:', error);
                    setErrorMessage(`Failed to fetch/process plans: ${error.message || 'Check API/network.'}`);
                    setPppoePlans([]);
                } finally {
                    setPlansLoading(false);
                    setLoading(false);
                }
            };
            fetchPPPoEPlans();
        } else {
            setPppoePlans([]);
            setPlansLoading(false);
            if (!routersLoading) {
                 setLoading(false);
            }
        }
    }, [selectedRouter, routers, user?.company_id, user?.company_username, accessToken]); // Added accessToken dependency


    // --- Pagination Calculations ---
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = pppoePlans ? pppoePlans.slice(indexOfFirstItem, indexOfLastItem) : [];
    const totalPlans = pppoePlans?.length ?? 0;
    const totalPages = Math.ceil(totalPlans / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // --- Plan Selection Handlers --- (FIXED)
    const togglePlanSelection = (id: number) => {
        setPppoePlans(prevPlans =>
            prevPlans.map(plan =>
                plan.id === id ? { ...plan, is_selected: !plan.is_selected } : plan
            )
        );
    };

    // FIXED: The toggleAllSelection function
    const toggleAllSelection = () => {
        // Check if all plans are currently selected
        const allSelected = pppoePlans.length > 0 && pppoePlans.every(plan => plan.is_selected);
        
        // Toggle selection state for all plans
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

    // FIXED: The applyBulkUpdate function - ensures updates only apply to selected plans
    const applyBulkUpdate = (field: 'plan_price' | 'plan_validity' | 'brand', value: string) => {
        if (value === null || value === undefined) return;
        
        // If the value is empty string for brand, don't apply unless explicitly intended
        if (field === 'brand' && value === '') {
            console.warn("Attempting to bulk apply empty brand selection.");
            // return; // Optional: uncomment to prevent applying empty selection
        }

        setPppoePlans(prevPlans =>
            prevPlans.map(plan =>
                // Only apply updates to plans that are actually selected
                plan.is_selected ? { ...plan, [field]: value } : plan
            )
        );
    };

    const handleApplyBulkFields = () => {
        if (bulkPrice) applyBulkUpdate('plan_price', bulkPrice);
        if (bulkValidity) applyBulkUpdate('plan_validity', bulkValidity);
        // Apply brand even if it's "" (meaning "-- Select --"), allowing bulk deselect essentially
        applyBulkUpdate('brand', bulkBrand);
    };

    // --- Validation and Import ---
    const areRequiredFieldsFilled = () => {
        if (!pppoePlans) return true;
        const missingField = pppoePlans.find(plan =>
            plan.is_selected && (!plan.plan_price || !plan.plan_validity || !plan.brand) // Check !plan.brand (requires a brand name string)
        );
        return !missingField;
    };

    const isAnyPlanSelected = () => {
        return pppoePlans && pppoePlans.some(plan => plan.is_selected);
    };

    const [selectedPlans, setSelectedPlans] = useState<ImportPPPOEPlan[]>([]);

    useEffect(() => {
        setSelectedPlans(pppoePlans.filter(plan => plan.is_selected));
    }, [pppoePlans]);

    const handleImportPlans = async () => {
        setErrorMessage('');

        if (selectedPlans.length === 0) {
            setErrorMessage('Please select at least one plan to import.');
            return;
        }

        if (!areRequiredFieldsFilled()) {
            // Error message is now more accurate for the dropdown
            setErrorMessage('Please fill in Price, Validity, and select a Brand for all selected plans.');
            return;
        }

        console.log('Importing Plans Data:', selectedPlans);
        setLoading(true);

        try {
            const response = await fetch('/backend/router-import-pppoe-plans', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${accessToken}` // Add auth if needed
                },
                body: JSON.stringify(selectedPlans),
            });

            if (!response.ok) {
                let errorMsg = 'Import failed due to server error.';
                try {
                    const errData = await response.json();
                    errorMsg = errData.message || `Import failed with status: ${response.status}`;
                } catch (parseError) {
                    errorMsg = `Import failed with status: ${response.status}`;
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();
            console.log('Import successful:', data);
            alert(`Successfully imported ${selectedPlans.length} plans.`);

            setPppoePlans(plans => plans.map(p => ({ ...p, is_selected: false })));
            setSelectedRouter(0);
            setBulkPrice('');
            setBulkValidity('30');
            setBulkBrand(''); // Reset bulk brand selection

        } catch (error: any) {
            console.error('Error importing plans:', error);
            setErrorMessage(`Import failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    // --- JSX Rendering ---
    // Combine all loading states that should disable interactions
    const isLoading = loading || routersLoading || plansLoading || brandsLoading;
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
                     <Col md="4" className="mb-3">
                         <Link href="/services/pppoeplans" passHref>
                             <Button color="secondary" className="px-4 py-2" disabled={isLoading}>
                                 <i className="bi bi-arrow-left mr-2"></i> Back to Plans List
                             </Button>
                         </Link>
                     </Col>
                     <Col md="4" className="mb-3">
                         <Label htmlFor="routerSelect">{'Select Router to Import From'}</Label>
                         <Input
                            id="routerSelect"
                            type="select"
                            value={selectedRouter || ''}
                            onChange={(e) => setSelectedRouter(Number(e.target.value))}
                            // Disable router selection while loading routers, plans, or brands, or if no routers exist
                            disabled={isLoading || noRoutersAvailable}
                        >
                             <option value="">
                                 {routersLoading ? 'Loading routers...' : (noRoutersAvailable ? 'No routers found' : '-- Select a Router --')}
                             </option>
                             {routers.map(router => (
                                 <option key={router.id} value={router.id}>
                                     {router.router_name} (ID: {router.id})
                                 </option>
                             ))}
                         </Input>
                     </Col>
                     <Col md="4" className="mb-3">
                        <Button
                            color="success"
                            className="px-4 py-2"
                            disabled={isLoading}
                            onClick={filterPlans}
                        >
                            Filter Existing Plans
                        </Button>
                    </Col>
                 </Row>
             </div>

             {/* Bulk Update Section */}
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
                                disabled={isLoading}
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
                                type="select" 
                                value={bulkBrand}
                                onChange={(e) => setBulkBrand(e.target.value)}
                                disabled={isLoading || brandsLoading}
                            >
                                <option value="">-- Select Brand --</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.name}>
                                        {brand.name}
                                    </option>
                                ))}
                            </Input>
                         </Col>
                     </Row>
                     <Button
                        color="primary"
                        className="mt-3"
                        onClick={handleApplyBulkFields}
                        disabled={isLoading || !isAnyPlanSelected()}
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
                        <span className="visually-hidden">Loading Plans...</span>
                    </div>
                    <p className="mt-2">Loading PPPoE Plans...</p>
                </div>
            )}

            {/* Plans Table Area */}
            {!plansLoading && selectedRouter > 0 && pppoePlans.length > 0 && (
                <>
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered table-striped">
                            <thead>
                                <tr>
                                    {/* FIXED: Added proper checkbox binding for the "select all" checkbox */}
                                    <th style={{ width: '5%' }}>
                                        <Input 
                                            type="checkbox" 
                                            checked={pppoePlans.length > 0 && pppoePlans.every(plan => plan.is_selected)}
                                            onChange={toggleAllSelection}
                                            disabled={isLoading}
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
                                        {/* FIXED: Added proper checkbox binding for each row */}
                                        <td>
                                            <Input 
                                                type="checkbox" 
                                                checked={plan.is_selected}
                                                onChange={() => togglePlanSelection(plan.id)}
                                                disabled={isLoading}
                                            />
                                        </td>
                                        <td>{indexOfFirstItem + currentData.indexOf(plan) + 1}</td>
                                        <td>{plan.name}</td>
                                        <td>{plan.rate_limit}</td>
                                        <td>
                                            <Input 
                                                type="number"
                                                min="0" 
                                                step="0.01"
                                                value={plan.plan_price}
                                                onChange={(e) => updatePlanField(plan.id, 'plan_price', e.target.value)}
                                                disabled={!plan.is_selected || isLoading}
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
                                                type="select"
                                                value={plan.brand}
                                                onChange={(e) => updatePlanField(plan.id, 'brand', e.target.value)}
                                                disabled={!plan.is_selected || isLoading || brandsLoading}
                                                className={!plan.brand && plan.is_selected ? 'is-invalid' : ''}
                                            >
                                                <option value="">-- Select Brand --</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.id} value={brand.name}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                            <div>
                                <span className="me-3">
                                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalPlans)} of {totalPlans} plans
                                </span>
                            </div>
                            <div>
                                <Button
                                    color="outline-primary"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isLoading}
                                >
                                    Previous
                                </Button>
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    // Simple logic for showing a window of pages around current page
                                    let pageNum = i + 1;
                                    if (currentPage > 3 && totalPages > 5) {
                                        pageNum = currentPage - 2 + i;
                                        if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                                    }
                                    return (
                                        <Button
                                            key={i}
                                            color={currentPage === pageNum ? "primary" : "outline-primary"}
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handlePageChange(pageNum)}
                                            disabled={isLoading}
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                })}
                                <Button
                                    color="outline-primary"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages || isLoading}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Import Action Area */}
                    <div className="mt-4 pt-3 border-top pb-4">
                        <p className="text-sm text-danger mb-2">* Price, Validity, and Brand are required fields for selected plans before importing.</p>
                        <Button
                            color="success"
                            size="lg"
                            className="px-5 py-2"
                            onClick={handleImportPlans}
                            disabled={isLoading || !isAnyPlanSelected() || !areRequiredFieldsFilled()}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faCircleArrowUp} size="1x" color="#fff" />
                                    {` Import ${selectedPlans.length} Selected Plans`} {/* <-- Changed here! */}
                                </>
                            )}
                        </Button>
                    </div>
                </>
            )}

            {/* Informational Messages */}
            {!plansLoading && selectedRouter === 0 && (
                <div className="text-center py-5 bg-light rounded">
                    <i className="bi bi-router display-4 text-muted"></i>
                    <h3 className="mt-3">Select a Router</h3>
                    <p className="text-muted">Choose a router from the dropdown above to view and import its PPPoE plans.</p>
                </div>
            )}

            {!plansLoading && selectedRouter > 0 && pppoePlans.length === 0 && (
                <div className="text-center py-5 bg-light rounded">
                    <i className="bi bi-exclamation-circle display-4 text-warning"></i>
                    <h3 className="mt-3">No Plans Found</h3>
                    <p className="text-muted">No PPPoE plans were found for the selected router. Try selecting a different router.</p>
                </div>
            )}

            {noRoutersAvailable && !routersLoading && (
                <div className="text-center py-5 bg-light rounded">
                    <i className="bi bi-router-fill display-4 text-danger"></i>
                    <h3 className="mt-3">No Routers Available</h3>
                    <p className="text-muted">
                        No routers were found for your company. Please add routers before attempting to import PPPoE plans.
                    </p>
                    <Link href="/system/routers" passHref>
                        <Button color="primary" className="mt-3">
                            <i className="bi bi-plus-circle me-2"></i> Add Routers
                        </Button>
                    </Link>
                </div>
            )}

            <WarningModal
                isOpen={isWarningModalOpen}
                toggle={toggleWarningModal}
            />
        </div>
    );
};

export default ImportPPPoEPlans;