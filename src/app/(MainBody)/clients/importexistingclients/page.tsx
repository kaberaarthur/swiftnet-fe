"use client"
import React, { useState, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Input, Label, Button, Alert, Spinner } from "reactstrap";
import * as XLSX from "xlsx";

// Redux Store
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';

const config = require("../../config/config.json");

const requiredHeaders = [
  "secret",
  "full_name",
  "start_date",
  "end_date",
  "plan_id",
  "location",
  "phone_number",
  "brand",
  "password"
];

interface Router {
    id: number;
    router_name: string;
  }
  
  interface PPPOEPlan {
    id: number;
    plan_name: string;
    plan_validity: number;
    plan_price: number;
    rate_limit_string: string;
  }

type ImportExistingClientsProps = {};

type FileEvent = React.ChangeEvent<HTMLInputElement>;

type RowData = Record<string, any>;

interface FormData {
    account: string;
    full_name: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
    payment_no: string;
    sms_group: string;
    installation_fee: string;
    router_id: number;
    company_id: number;
    company_username: string;
    active: number;
    fat_no: string;
    rate_limit: string;
    plan_name: string;
    plan_id: number;
    plan_fee: number;
    type: string;
    brand: string;
  }

export default function ImportExistingClients(props: ImportExistingClientsProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [tableData, setTableData] = useState<RowData[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [routers, setRouters] = useState<Router[]>([]);
  const [pppoePlans, setPppoePlans] = useState<PPPOEPlan[]>([]);

  const user = useSelector((state: RootState) => state.user);

  // Fetch routers based on the company_id
    useEffect(() => {
      if (user.company_id) {
        const fetchRouters = async () => {
          try {
            const routerResponse = await fetch(`/backend/routers?company_id=${user.company_id}`);
            const routerData: Router[] = await routerResponse.json();
            setRouters(routerData);
  
            setFormData((prevData) => ({
              ...prevData,
              company_id: user.company_id || 0,
              company_username: user.company_username || "",
            }));
          } catch (error) {
            console.error('Error fetching routers:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchRouters();
      }
    }, [user.company_id, user.company_username]);

    const [formData, setFormData] = useState<FormData>({
        account: "",
        full_name: "",
        email: "",
        password: "",
        address: "",
        phone_number: "",
        payment_no: "",
        sms_group: "",
        installation_fee: "",
        router_id: 0, 
        company_id: 0,
        company_username: "",
        active: 1,
        fat_no: "",
        rate_limit: "",
        plan_name: "",
        plan_id: 0,
        plan_fee: 0,
        type: "pppoe",
        brand: "Default",
      });

    // Load plans based on selected router
    useEffect(() => {
      if (formData.router_id && user.company_id) {
        setLoading(true);
        const fetchHotspotPlans = async () => {
          try {
            const plansResponse = await fetch(`/backend/pppoe-plans?router_id=${formData.router_id}&company_id=${user.company_id}&type=pppoe`);
            const plansData: PPPOEPlan[] = await plansResponse.json();
            setPppoePlans(plansData);
  
            // Automatically set plan_id, plan_name, and plan_validity if there's only one plan
            if (plansData.length === 1) {
              setFormData((prevData) => ({
                ...prevData,
                plan_id: plansData[0].id,
                plan_name: plansData[0].plan_name,
                plan_fee: plansData[0].plan_price,
                rate_limit: plansData[0].rate_limit_string,
              }));
            }
          } catch (error) {
            console.error('Error fetching hotspot plans:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchHotspotPlans();
      }
    }, [formData.router_id, user.company_id]);

  function excelSerialToDate(serial: number): string {
    // Excel starts on 1900-01-01 as day 1 (but it treats 1900 as a leap year)
    const excelStartDate = new Date(Date.UTC(1899, 11, 30)); // Start date for Excel
    const jsDate = new Date(excelStartDate.getTime() + serial * 86400000); // Add the serial days in milliseconds
    
    // Manually format the date as "YYYY-MM-DD 00:00:00" (with midnight time)
    const year = jsDate.getUTCFullYear();
    const month = String(jsDate.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(jsDate.getUTCDate()).padStart(2, '0');
    
    // Format the final string
    return `${year}-${month}-${day} 00:00:00`;
  }
  

  const handleFileUpload = (event: FileEvent) => {
    const file = event.target.files?.[0];
    if (!file) {
      setMessage("No file selected.");
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];
  
      if (jsonData.length === 0) {
        setMessage("The file is empty.");
        return;
      }
  
      const headers = jsonData[0] as string[];
      const missingHeaders = requiredHeaders.filter(
        (header) => !headers.includes(header)
      );
  
      if (missingHeaders.length > 0) {
        setMessage(
          `The file is missing the following required headers: ${missingHeaders.join(", ")}`
        );
        setTableData(null);
      } else {
        setMessage("The file follows the required convention.");
        const rows = jsonData.slice(1).map((row) => {
          const rowData: RowData = {};
          headers.forEach((header, index) => {
            let value = row[index] || "";
  
            // Convert Excel serial dates for start_date and end_date
            if ((header === "start_date" || header === "end_date") && typeof value === "number") {
              value = excelSerialToDate(value);
            }
  
            // Ensure secret, phone_number start with a 0
            if ((header === "secret" || header === "phone_number") && typeof value === "number") {
              value = "0" + String(value);
            }
  
            // Ensure password is a string
            if (header === "password") {
              value = String(value);
            }
  
            rowData[header] = value;
          });
          return rowData;
        });
  
        setTableData(rows);
        console.log("Rows: ", rows);
      }
    };
  
    reader.onerror = () => {
      setMessage("Error reading the file.");
      setTableData(null);
    };
  
    reader.readAsArrayBuffer(file);
  };
  

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const performImport = async (router_id: number) => {
    setLoading(true);
    if (router_id === 0) {
      setError("You have not selected a Router");
      return; // Exit if no router is selected
    }

    // Check if tableData is empty or null
    if (!tableData || tableData.length === 0) {
        setError("No data to import");
        return; // Exit if tableData is empty
    }
  
    console.log("Importing Users to Router: ", router_id);
    console.log("Import Data: ", tableData);
  
    // Prepare the data to send in the POST request
    const dataToSend = {
      router_id,
      clients: tableData, // Send the tableData as the clients
    };

    // console.log("Data to Send: ", dataToSend);
  
    try {
      const response = await fetch(`${config.baseUrl}/import-users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Convert the data object to a JSON string
      });
  
      // Check if the response was successful
      if (!response.ok) {
        throw new Error('Failed to import data');
      }
  
      const result = await response.json(); // Assuming the backend returns a JSON response
      console.log('Import successful:', result);
      setMessage("Users imported successfully.");
      setError(""); // Clear any existing errors
    } catch (error) {
      console.error("Error during import:", error);
      setError("Error occurred while importing users.");
    }
    setLoading(false);
  };
  

  return (
    <div className="p-2">
      <div className="max-w-md mx-auto bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Import Users</h2>
        <p className="text-red-600 text-sm" style={{ color: '#E7000B' }}>{error}</p>
        
        
        <Row>
            <Col>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-4"
                />
            </Col>
            <Col>
                <Button
                    onClick={() => {
                        performImport(Number(formData.router_id));
                    }}
                    disabled={loading} // Disable the button if loading is true
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    >
                    {loading ? (
                        <div className="flex items-center">
                        <svg
                            className="animate-spin h-5 w-5 mr-2 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 6"
                        >
                            <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            ></circle>
                            <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                        Loading...
                        </div>
                    ) : (
                        "Click to Import"
                    )}
                    </Button>
            </Col>
            <Col sm="6">
              <Label>{'Routers'}</Label>
                <Input
                    type="select"
                    name="router_id"
                    value={formData.router_id}
                    onChange={handleInputChange}
                >
                    <option value="">Select Router</option>
                    {routers.map(router => (
                    <option key={router.id} value={router.id}>
                        {router.router_name}
                    </option>
                    ))}
                </Input>
            </Col>
            
        </Row>
        {message && <p className="text-sm text-gray-700 mt-4">{message}</p>}

        {tableData && (
          <div className="overflow-x-auto mt-6">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  {requiredHeaders.map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-4 py-2 text-left bg-gray-100"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                    {requiredHeaders.map((header) => (
                      <td
                        key={header}
                        className="border border-gray-300 px-4 py-2"
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
