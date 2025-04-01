"use client";

import { useDataStoreContext } from "@/context/DataStoreProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = ({ data }: any) => {
    const { setMetalsApiData } = useDataStoreContext();
    const { data: session, status } = useSession();
    const router = useRouter();

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

    /*useEffect(() => {
      if (status === "loading") return;
      if (status === "unauthenticated") {
        router.push("/login");
      } else {
        router.push("/app");
      }
    }, [status, router]);*/

    return (
        <div className="page">
            <div className="page__container">
                <h1>Pozdravljen, {session?.user?.name}</h1>
                <div>
                    {accountInfo ? (
                        <pre>{JSON.stringify(accountInfo, null, 2)}</pre>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
