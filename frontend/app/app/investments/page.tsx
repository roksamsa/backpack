import { getCategoryById } from "@/src/services/data-service";
import React from "react";

const InvestmentsPage = async () => {
  let investmentsData;

  try {
    investmentsData = await getCategoryById(1);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1>{investmentsData?.data?.data?.attributes?.name}</h1>
      <p>{investmentsData?.data?.data?.attributes?.description}</p>
    </div>
  );
};

export default InvestmentsPage;
