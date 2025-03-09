"use client";
import { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row, Alert } from "reactstrap";
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import { RootState } from '../../../../../Redux/Store'; // Adjust path as needed

const config = require("../../config/config.json");


const AddManager = () => {
    const user = useSelector((state: RootState) => state.user);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [customAlert, setCustomAlert] = useState({ message: "", type: "" });

    const showAlert = (message: string, type: string) => {
        setCustomAlert({ message, type });
        setTimeout(() => {
            setCustomAlert({ message: "", type: "" });
        }, 5000);
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "", // Added password field
        user_type: "manager",
        company_id: user.company_id,
        company_username: user.company_username,
        active: 1
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "company_id" || name === "active" ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
        
        if (!accessToken) {
            setError("No access token found. Please log in.");
            setLoading(false);
            return;
        }

        // Prepare the body for the API request
        const requestBody = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password, // Use password from formData
            company_username: formData.company_username
        };

        // Log the request body before sending
        console.log("Request Body:", requestBody);

        try {
            const response = await fetch(`${config.baseUrl}/api/create-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();

            if (!response.ok) {
                showAlert(data.message || "Failed to create user", "danger");
            }

            setSuccess(data.message); // "User created successfully"
            // Reset form including password
            setFormData({
                name: "",
                email: "",
                phone: "",
                password: "", // Reset password field
                user_type: "manager",
                company_id: user.company_id,
                company_username: user.company_username,
                active: 1
            });
            showAlert("User created successfully", "success");
        } catch (err: any) {
            showAlert(err.message || "Failed to create user", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Add Manager</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    {/* Alert Message */}
                    {customAlert.message && (
                        <Alert color={customAlert.type} className="text-center">
                            {customAlert.message}
                        </Alert>
                    )}
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="phone">Phone</Label>
                            <Input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="user_type">User Type</Label>
                            <Input
                                type="select"
                                name="user_type"
                                id="user_type"
                                value={formData.user_type}
                                onChange={handleChange}
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <FormGroup className="mt-4">
                            <Button color="primary" type="submit" block disabled={loading}>
                                {loading ? "Adding..." : "Add Manager"}
                            </Button>
                        </FormGroup>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default AddManager;