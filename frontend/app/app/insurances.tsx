"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected/protected-route";
import ProtectedLayout from "@/components/protected/protected-layout";

const InsurancesPage = () => {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <h1>Insurances</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </ProtectedLayout>
    </ProtectedRoute>
  );
};

export default InsurancesPage;
