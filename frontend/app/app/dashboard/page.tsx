import { getCategoryById } from "@/src/services/data-service";
import React from "react";

const DashboardPage = async () => {
  let dashboardData;

  try {
    dashboardData = await getCategoryById(0);
  } catch (error) {
    console.log(error);
  }

  return (
    <div>
      <h1>{dashboardData?.data?.attributes?.name}</h1>
      <p>{dashboardData?.data?.attributes?.description}</p>
    </div>
  );
};

export default DashboardPage;
