'use client'
import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DefaultDashboard = () => {
  // Automatically Redirect to /dashboard/ecommerce
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/ecommerce");
  }, [router]);


  const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/General/Dashboard/Default/Default")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  // return MyAwesomeMap ? <MyAwesomeMap /> : "";
  return null;
};

export default DefaultDashboard;
