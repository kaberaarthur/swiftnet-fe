"use client"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ACAU = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    
    useEffect(() => {
        window.location.href = `/authentication/acustomer?id=${id}`;
    }, []);
    
    return (
        <div className="flex items-center justify-center h-screen text-xl font-bold">
            ID: {id || "No ID Provided"}
        </div>
    );
};

export default ACAU;
