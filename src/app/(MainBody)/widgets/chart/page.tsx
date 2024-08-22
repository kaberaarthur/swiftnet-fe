'use client'
import React, { FunctionComponent, useEffect, useState } from "react";

const ChartWidgets = () => {
  const [MyAwesomeMap, setClient] = useState<FunctionComponent>();
  useEffect(() => {
    (async () => {
      if (typeof window !== "undefined") {
        const newClient = (await import("@/Components/General/Widgets/Charts/ContainerChart")).default;
        setClient(() => newClient);
      }
    })();
  }, []);
  return MyAwesomeMap ? <MyAwesomeMap /> : "";
};

export default ChartWidgets;
