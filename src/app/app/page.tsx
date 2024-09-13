import { fetchData } from "@/utils/apiHelper";
import Dashboard from "./dashboard";

const DashboardPage = async () => {
  const apiKey = process.env.METALS_API_KEY;
  const metalsApiData = await fetchData({
    url: "https://api.metals.dev/v1/latest",
    query: { api_key: apiKey, currency: "EUR", unit: "g" },
    method: "GET",
  });

  return <Dashboard data={metalsApiData} />;
};

export default DashboardPage;
