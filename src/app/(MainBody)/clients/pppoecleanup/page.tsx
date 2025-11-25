'use client'
import React, { useEffect, useState } from 'react';
import { Button, Alert, Spinner, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/Store';
import config from "../../config/config.json";
import Cookies from "js-cookie";

interface TableRow {
  id: number;
  router_name: string;
}

interface DBSearchResult {
  secret: string;
  results: {
    router_id: number;
    router_name: string;
    found_in_db: boolean;
    db_user_id: number | null;
  }[];
}

type ResultItem = DBSearchResult['results'][0];

const SearchSecrets: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const [routers, setRouters] = useState<TableRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [secretName, setSecretName] = useState("");
  const [selectedRouters, setSelectedRouters] = useState<number[]>([]);
  const [searchResults, setSearchResults] = useState<DBSearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRouter, setSelectedRouter] = useState<ResultItem | null>(null);
  const [moveToRouterId, setMoveToRouterId] = useState<number | null>(null);

  const accessToken =
    Cookies.get("accessToken") || localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchRouters = async () => {
      const url = `${config.baseUrl}/routers?company_id=${user.company_id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch routers");

        const data = await response.json();
        setRouters(data);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    if (user?.company_id) fetchRouters();
  }, [user]);

  const toggleRouterSelection = (routerId: number) => {
    setSelectedRouters(prev =>
      prev.includes(routerId)
        ? prev.filter(id => id !== routerId)
        : [...prev, routerId]
    );
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const body = { secret_name: secretName, routers: selectedRouters };

    try {
      const response = await fetch(`${config.baseUrl}/mikrotik/search-secret`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Backend error:", result);
        return;
      }

      setSearchResults(result);
    } catch (err) {
      console.error("Request Failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const openMoveModal = (res: ResultItem) => {
    setSelectedRouter(res);
    setMoveToRouterId(null);
    setMoveModalOpen(true);
  };

  const handleMoveConfirm = async () => {
    if (!searchResults || !selectedRouter || !moveToRouterId) return;

    const body = {
      secret: searchResults.secret,
      former_router_id: selectedRouter.router_id,
      new_router_id: moveToRouterId
    };

    console.log("📤 Move Body:", body);

    try {
      const response = await fetch(`${config.baseUrl}/mikrotik/move-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("❌ Move Error:", result);
        alert(result.error || result.message || "Failed to move user");
        return;
      }

      alert("User successfully moved!");
      // Optionally, refresh the search results to reflect the change
      handleSearch();

    } catch (err) {
      console.error("🚨 Request Failed:", err);
      alert("Failed to move user due to network error");
    } finally {
      setMoveModalOpen(false);
    }
  };

  const openDeleteModal = (res: ResultItem) => {
    setSelectedRouter(res);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRouter) return;

    try {
      const response = await fetch(`${config.baseUrl}/mikrotik/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          db_user_id: selectedRouter.db_user_id,
          router_id: selectedRouter.router_id
        }),
      });

      const result = await response.json();
      console.log("Delete Response:", result);

      // Refresh search results after deletion
      if (searchResults) {
        setSearchResults({
          ...searchResults,
          results: searchResults.results.filter(r => r.db_user_id !== selectedRouter.db_user_id)
        });
      }

    } catch (err) {
      console.error("Delete request failed:", err);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  return (
    <div className="pt-4 px-4 bg-white dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Search Secret in Database
      </h2>

      {error && <Alert color="danger">{error}</Alert>}

      {/* Secret Input */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Enter Secret Name:
        </label>
        <input
          type="text"
          value={secretName}
          onChange={(e) => setSecretName(e.target.value)}
          placeholder="Enter secret name..."
          className="border p-2 w-full rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        />
      </div>

      <p className="text-md font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Select routers to search within
      </p>

      {/* Router Checkboxes */}
      <div className="border rounded p-4 bg-white shadow-sm max-h-[400px] overflow-y-auto dark:bg-gray-800 dark:border-gray-600">
        {routers.map(router => (
          <div key={router.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              className="mr-2"
              checked={selectedRouters.includes(router.id)}
              onChange={() => toggleRouterSelection(router.id)}
            />
            <span className="text-lg">{router.router_name} (ID: {router.id})</span>
          </div>
        ))}
      </div>

      <Button
        color="primary"
        className="mt-4 px-5"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? <><Spinner size="sm" className="mr-2" /> Searching...</> : "Search"}
      </Button>

      {/* Results */}
      {searchResults && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            Found in {searchResults.results.filter(r => r.found_in_db).length} Routers
          </h3>

          <Table striped bordered hover className="bg-white dark:bg-gray-800">
            <thead>
              <tr>
                <th>Router</th>
                <th>User ID</th>
                <th>Secret</th>
                <th>Move Client</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {searchResults.results.filter(r => r.found_in_db).map((res, index) => (
                <tr key={index}>
                  <td>{res.router_name}</td>
                  <td>{res.db_user_id}</td>
                  <td>{searchResults.secret}</td>
                  <td>
                    <Button color="primary" size="sm" onClick={() => openMoveModal(res)}>
                      Move Client
                    </Button>
                  </td>
                  <td>
                    <Button color="danger" size="sm" onClick={() => openDeleteModal(res)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Move Modal */}
      <Modal isOpen={moveModalOpen} toggle={() => setMoveModalOpen(false)}>
        <ModalHeader toggle={() => setMoveModalOpen(false)}>
          Move customer to another Router
        </ModalHeader>
        <ModalBody>
          <p>Move this customer from <strong>{selectedRouter?.router_name}</strong> to another router.</p>
          <label className="block mb-2">Select Router:</label>
          <select
            className="border p-2 w-full rounded"
            value={moveToRouterId || ""}
            onChange={(e) => setMoveToRouterId(Number(e.target.value))}
          >
            <option value="">-- Select --</option>
            {routers.filter(r => r.id !== selectedRouter?.router_id).map(r => (
              <option key={r.id} value={r.id}>{r.router_name}</option>
            ))}
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setMoveModalOpen(false)}>Cancel</Button>
          <Button color="primary" disabled={!moveToRouterId} onClick={handleMoveConfirm}>Confirm Move</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModalOpen} toggle={() => setDeleteModalOpen(false)}>
        <ModalHeader toggle={() => setDeleteModalOpen(false)}>
          Confirm Deletion
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this customer <strong>{searchResults?.secret}</strong> from the router <strong>{selectedRouter?.router_name}</strong> and the system?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button color="danger" onClick={handleDeleteConfirm}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SearchSecrets;
