"use client";
import React, { FunctionComponent, useEffect, useState } from "react";

const AdvanceInit = () => {
  const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/Tables/DataTables/AdvanceInit/AdvanceInit")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return MyAwesomeMap ? <MyAwesomeMap /> : "";
};

export default AdvanceInit;
