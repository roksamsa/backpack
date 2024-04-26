import React from "react";

import { Session } from "next-auth";
import { Button } from "@nextui-org/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Backpack",
};

const HomePage = async ({ session }: { session: Session | null }) => {
    console.log("user");
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/login">
          <Button color="default">Login</Button>
        </Link>
        <Link href="/register">
          <Button color="default">Register</Button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <Button color="default">Sign out</Button>
        </Link>
      </div>
    );
  };

  if (!session) {
    return (
      <div className="hero">
        <div className="navbar">
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
        <div className="text">You aren't authorized to view this page</div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      <div className="text">Hello world</div>
    </div>
  );
};

export default HomePage;
