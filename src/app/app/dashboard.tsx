"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { fetchData } from "@/utils/apiHelper";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = ({ data }: any) => {
  const { setMetalsApiData } = useDataStoreContext();
  const { data: session } = useSession();

  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    async function fetchAccountInfo() {
      const response = await fetch("/api/binance");
      const data = await response.json();
      const nonZeroBalances = data?.balances?.filter((balance: any) => {
        const freeAmount = parseFloat(balance.free);
        const lockedAmount = parseFloat(balance.locked);

        return freeAmount + lockedAmount > 0;
      });

      setAccountInfo(nonZeroBalances);
    }

    fetchAccountInfo();
  }, []);

  useEffect(() => {
    const getCryptoPrices = async () => {
      const response = await fetch("/api/binance/prices");
      const data = await response.json();
      console.log("DDDDDDDDDD", data);
    };

    getCryptoPrices();
  }, []);

  useEffect(() => {
    setMetalsApiData(data);
  }, [data, setMetalsApiData]);

  return (
    <div className="page">
      <h1>Pozdravljen, {session?.user?.name}</h1>
      <div>
        {accountInfo ? (
          <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
