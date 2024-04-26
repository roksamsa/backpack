import { getUserData } from "@/src/services/user-service";
import React from "react";

const DashboardPage = () => {
    console.log("user");
  try {
    const user = getUserData();
    console.log("user", user);
  } catch (error) {
    console.log("error", error);
}

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
    </div>
  );
};

export default DashboardPage;
