// Define the return type for the API functions
interface ApiResponse {
  message?: string;
  [key: string]: any; // Adjust based on your actual API response structure
}

// Delete a single client (removes from both system and Mikrotik Router)
export const deletePppoeClient = async (clientId: number, accessToken: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`/backend/pppoe-clients/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete client');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting client:', error);
    throw error; // Propagate error for handling in the calling function
  }
};

// Remove a single client (removes from system only, keeps on Mikrotik Router)
export const removePppoeClientFromSystem = async (clientId: number, accessToken: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`/backend/pppoe-clients-only-system/${clientId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove client session');
    }

    return await response.json();
  } catch (error) {
    console.error('Error removing client session:', error);
    throw error; // Propagate error for handling in the calling function
  }
};