import { fetchData } from "@/utils/apiHelper";
import Dashboard from "./dashboard";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
    /*const apiKey = process.env.METALS_API_KEY;
    
    const metalsApiData2 = await fetchData({
      url: "https://api.metals.dev/v1/latest",
      query: { api_key: apiKey, currency: "EUR", unit: "g" },
      method: "GET",
    });*/

    const metalsApiData = {};

    return <Dashboard data={metalsApiData} />;
};

export default DashboardPage;
