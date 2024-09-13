"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useEffect } from "react";

const Dashboard = ({ data }: any) => {
  const { setMetalsApiData } = useDataStoreContext();

  useEffect(() => {
    setMetalsApiData(data);
  }, [data, setMetalsApiData]);

  return (
    <div className="page">
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
