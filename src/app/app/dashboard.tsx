"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Dashboard = ({ data }: any) => {
  const { setMetalsApiData } = useDataStoreContext();
  const { data: session } = useSession();

  useEffect(() => {
    setMetalsApiData(data);
  }, [data, setMetalsApiData]);

  return (
    <div className="page">
      <h1>Pozdravljen, {session?.user?.name}</h1>
    </div>
  );
};

export default Dashboard;
