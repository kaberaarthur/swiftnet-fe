"use client"
import { useState, useEffect } from "react";
import {
  Button, Table, Alert, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Col, Row
} from "reactstrap";
import Cookies from "js-cookie";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import config from "../../config/config.json";

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

interface DeletedUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  company_id: number;
  company_username: string;
  deleted_at: string;
}

const People = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [deletedUsers, setDeletedUsers] = useState<DeletedUser[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletedLoading, setDeletedLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

  const [editModal, setEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", user_type: "" });
  const [editLoading, setEditLoading] = useState(false);

  const [resetModal, setResetModal] = useState(false);
  const [resetUserId, setResetUserId] = useState<number | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [restoreLoading, setRestoreLoading] = useState<number | null>(null);

  const showAlert = (message: string, type: string) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  const getToken = () => Cookies.get("accessToken") || localStorage.getItem("accessToken");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    const accessToken = getToken();
    if (!accessToken) {
      setError("No access token found. Please log in.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${config.baseUrl}/api/users`, {
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "An error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedUsers = async () => {
    setDeletedLoading(true);
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users-deleted`, {
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error("Failed to fetch deleted users");
      const data: DeletedUser[] = await response.json();
      setDeletedUsers(data);
    } catch (err: any) {
      showAlert(err.message || "Failed to load deleted users", "danger");
    } finally {
      setDeletedLoading(false);
    }
  };

  const handleToggleDeleted = () => {
    const next = !showDeleted;
    setShowDeleted(next);
    if (next && deletedUsers.length === 0) fetchDeletedUsers();
  };

  const toggleUserStatus = async (userId: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users/${userId}/toggle-active`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      if (!response.ok) throw new Error("Failed to update user status");
      setUsers(users.map(u => u.id === userId ? { ...u, active: newStatus } : u));
    } catch (err: any) {
      showAlert(err.message || "Failed to update user status", "danger");
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, phone: user.phone, user_type: user.user_type });
    setEditModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditLoading(true);
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
        body: JSON.stringify(editForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update user");
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...editForm } : u));
      setEditModal(false);
      showAlert("User updated successfully", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to update user", "danger");
    } finally {
      setEditLoading(false);
    }
  };

  const openResetModal = (userId: number) => {
    setResetUserId(userId);
    setNewPassword("");
    setShowPassword(false);
    setResetModal(true);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetUserId) return;
    setResetLoading(true);
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users/${resetUserId}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${accessToken}` },
        body: JSON.stringify({ newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to reset password");
      setResetModal(false);
      showAlert("Password reset successfully", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to reset password", "danger");
    } finally {
      setResetLoading(false);
    }
  };

  const openDeleteModal = (user: User) => {
    setDeletingUser(user);
    setDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setDeleteLoading(true);
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users/${deletingUser.id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete user");
      setUsers(users.filter(u => u.id !== deletingUser.id));
      setDeleteModal(false);
      // Add to deleted list if it's currently visible
      if (showDeleted) fetchDeletedUsers();
      showAlert("User deleted successfully", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to delete user", "danger");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleRestore = async (userId: number) => {
    setRestoreLoading(userId);
    try {
      const accessToken = getToken();
      const response = await fetch(`${config.baseUrl}/api/users/${userId}/restore`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${accessToken}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to restore user");
      setDeletedUsers(deletedUsers.filter(u => u.id !== userId));
      setUsers(prev => [...prev, data.user]);
      showAlert("User restored successfully", "success");
    } catch (err: any) {
      showAlert(err.message || "Failed to restore user", "danger");
    } finally {
      setRestoreLoading(null);
    }
  };

  return (
    <div className="mt-4">
      <h2>People</h2>

      <div className="d-flex gap-2 my-4">
        <Link href="/users/people/addmanager">
          <Button color="primary">Add Manager</Button>
        </Link>
        <Button color={showDeleted ? "secondary" : "outline-secondary"} onClick={handleToggleDeleted}>
          {showDeleted ? "Hide Deleted Users" : "Show Deleted Users"}
        </Button>
      </div>

      {alert && <Alert color={alert.type} className="mb-3">{alert.message}</Alert>}
      {error && <Alert color="danger" className="mb-3">{error}</Alert>}

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
                  <div className="d-flex gap-1 flex-wrap">
                    <Button color="warning" size="sm" onClick={() => openEditModal(user)}>
                      Edit
                    </Button>
                    <Button color="info" size="sm" onClick={() => openResetModal(user.id)}>
                      Reset Password
                    </Button>
                    <Button
                      color={user.active === 1 ? "secondary" : "success"}
                      size="sm"
                      onClick={() => toggleUserStatus(user.id, user.active)}
                    >
                      {user.active === 1 ? "Deactivate" : "Activate"}
                    </Button>
                    <Button color="danger" size="sm" onClick={() => openDeleteModal(user)}>
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showDeleted && (
        <div className="mt-4">
          <h5 className="text-muted">Deleted Users</h5>
          {deletedLoading ? (
            <p>Loading...</p>
          ) : deletedUsers.length === 0 ? (
            <p className="text-muted">No deleted users.</p>
          ) : (
            <Table striped responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>User Type</th>
                  <th>Deleted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deletedUsers.map((user) => (
                  <tr key={user.id} className="text-muted">
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.user_type}</td>
                    <td>{new Date(user.deleted_at).toLocaleDateString()}</td>
                    <td>
                      <Button
                        color="success"
                        size="sm"
                        disabled={restoreLoading === user.id}
                        onClick={() => handleRestore(user.id)}
                      >
                        {restoreLoading === user.id ? "Restoring..." : "Restore"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}

      {/* Edit User Modal */}
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Edit User</ModalHeader>
        <Form onSubmit={handleEditSubmit}>
          <ModalBody>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={editForm.email}
                    onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    type="tel"
                    value={editForm.phone}
                    onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="edit-user-type">User Type</Label>
                  <Input
                    id="edit-user-type"
                    type="select"
                    value={editForm.user_type}
                    onChange={e => setEditForm(f => ({ ...f, user_type: e.target.value }))}
                  >
                    <option value="manager">Manager</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={editLoading}>
              {editLoading ? "Saving..." : "Save Changes"}
            </Button>
            <Button color="secondary" type="button" onClick={() => setEditModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal isOpen={resetModal} toggle={() => setResetModal(false)}>
        <ModalHeader toggle={() => setResetModal(false)}>Reset Password</ModalHeader>
        <Form onSubmit={handleResetPassword}>
          <ModalBody>
            <FormGroup>
              <Label for="new-password">New Password</Label>
              <div className="input-group">
                <Input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  minLength={8}
                  required
                />
                <div className="input-group-append">
                  <Button color="secondary" type="button" onClick={() => setShowPassword(s => !s)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </div>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" disabled={resetLoading}>
              {resetLoading ? "Resetting..." : "Reset Password"}
            </Button>
            <Button color="secondary" type="button" onClick={() => setResetModal(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader toggle={() => setDeleteModal(false)}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete <strong>{deletingUser?.name}</strong>? This action cannot be undone.
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete} disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
          <Button color="secondary" type="button" onClick={() => setDeleteModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default People;
