const config = require("../config/config.json");

// Function to log activities locally
export const postLocalLog = async (description: string, user: any, router_id: any) => {
  try {
    // Fetch IP address dynamically from the backend
    const ipResponse = await fetch(`${config.baseUrl}/ipaddress/get-ip`);
    if (!ipResponse.ok) {
      throw new Error('Failed to fetch IP address');
    }
    const ipData = await ipResponse.json();

    // Prepare the data for logging
    const data = {
      user_type: user.user_type,
      ip_address: ipData.ip, // Dynamically fetched IP
      description,
      company_id: user.company_id,
      company_username: user.company_username,
      user_id: user.id,
      name: user.name,
      router_id: router_id,
    };

    console.log("Log Data: ", data)

    // Send the log data to the backend
    const response = await fetch(`${config.baseUrl}/local_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Failed to send log data to /backend/local_logs');
    }

    const result = await response.json();
    console.log('Log successfully posted:', result);
  } catch (error) {
    console.error('Error posting local log:', error);
  }
};
