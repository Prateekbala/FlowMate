"use client";
import React from "react";
import { signOut } from "next-auth/react";
const page: React.FC = () => {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage or any other page after sign out
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
    >
      Sign Out
    </button>
  );
};

export default page;
