"use client"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ACAU = () => {
    const searchParams = useSearchParams();
    const id = searchParams!``.get("id");
    
    useEffect(() => {
        if (id) {
            window.location.href = `https://swiftnet-fe.vercel.app/authentication/acustomer?id=${id}`;
        }
    }, [id]); // Depend on `id` to ensure it updates correctly
    
    return (
        <div className="flex items-center justify-center h-screen text-xl font-bold">
            {id ? `Redirecting with ID: ${id}` : "No ID Provided"}
        </div>
    );
};

export default ACAU;
