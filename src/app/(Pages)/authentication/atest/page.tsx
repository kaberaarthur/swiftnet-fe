// pages/Atest.js
"use client"
import { useEffect } from 'react';

const Atest = () => {
  useEffect(() => {
    console.log("Get Message");
    // Function to fetch data from the endpoint
    const fetchData = async () => {
      try {
        const id = 68;
        const phoneNumber = "0790485731";

        const response = await fetch(`/microservice/api/payment`, {
            method: 'POST', // HTTP method
            headers: {
              'Content-Type': 'application/json', // Ensure the server knows we're sending JSON
            },
            body: JSON.stringify({
              client_id: id, // Data to send in the request body
              phone_number: phoneNumber
            }),
          });
        
        console.log('Response:', response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Make the request when the component mounts
    fetchData();
  }, []);

  return (
    <div>
      <h1>Atest Page</h1>
      <p>Check the console for the response from the endpoint.</p>
    </div>
  );
};

export default Atest;
