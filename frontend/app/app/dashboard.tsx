"use client";
import React, { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protected/protected-route";
import ProtectedLayout from "@/components/protected/protected-layout";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <ProtectedLayout>
        <h1>Dashboard</h1>
      </ProtectedLayout>
    </ProtectedRoute>
  );
};

export default DashboardPage;
