"use client"
import { useState, useEffect } from "react";
import { Button, Table, Alert } from "reactstrap";
import Cookies from "js-cookie";
import Link from "next/link";

import config from "../../config/config.json";


// Interface for user data
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  company_id: number;
  company_username: string;
  active: number;
}

const People = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    if (!accessToken) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${config.baseUrl}/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Toggle user active status (placeholder - you'll need a proper endpoint)
  const toggleUserStatus = async (userId: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    
    try {
      const accessToken = Cookies.get("accessToken") || localStorage.getItem("accessToken");
      
      // This is a placeholder - you'll need to create an actual PATCH endpoint
      const response = await fetch(`${config.baseUrl}/api/users/${userId}/toggle-active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        }
      });

      if (!response.ok) {
        throw new Error("Failed to update user status");
      }

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, active: newStatus } : user
      ));
    } catch (err: any) {
      setError(err.message || "Failed to update user status");
    }
  };

  return (
    <div className="mt-4">
      <h2>People</h2>

      <Link href={"/users/people/addmanager"}>
        <Button className="my-4">Add Manager</Button>
      </Link>
      
      {error && (
        <Alert color="danger" className="mb-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.user_type}</td>
                <td>{user.active === 1 ? "Active" : "Inactive"}</td>
                <td>
                  {user.active === 1 ? (
                    <Button
                      color="danger"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id, user.active)}
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      color="success"
                      size="sm"
                      onClick={() => toggleUserStatus(user.id, user.active)}
                    >
                      Activate
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default People;