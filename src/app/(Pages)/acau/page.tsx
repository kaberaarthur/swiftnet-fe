"use client"
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ACAU = () => {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        if (id) {
            // Set a cookie that expires in 7 days
            document.cookie = `edmin_login=true; path=/; max-age=${7 * 24 * 60 * 60}`;
        }
        // Redirect the user
        window.location.href = `https://swiftnet-fe.vercel.app/authentication/acustomer?id=${id || 225}`;
    }, [id]);

    return (
        <div className="flex items-center justify-center h-screen text-xl font-bold">
            ID: {id || "No IDs Provided"}
        </div>
    );
};

export default ACAU;
