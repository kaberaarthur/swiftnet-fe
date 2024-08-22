"use client";
import { FunctionComponent, useEffect, useState } from "react";

const Ecommerce = () => {
  const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/General/Dashboard/Ecommerce/Ecommerce")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return MyAwesomeMap ? <MyAwesomeMap /> : "";
};

export default Ecommerce;
