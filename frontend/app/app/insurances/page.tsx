import { getCategoryById } from "@/src/services/data-service";
import React from "react";

const InsurancesPage = async () => {
  let insurancesData;

  try {
    insurancesData = await getCategoryById(2);
  } catch (error) {
    console.log(error);
  }
  return (
    <div>
      <h1>{insurancesData?.data?.attributes?.name}</h1>
      <p>{insurancesData?.data?.attributes?.description}</p>
    </div>
  );
};

export default InsurancesPage;
