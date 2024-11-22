"use client";

import React, { useState } from "react";
import ProfileForm from "../../../components/ProfileForm";

const UpdateName = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSuccess = () => {
    setSuccessMessage("Name updated successfully!");
    setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-muted text-foreground py-6">
      <div className="max-w-sm w-full px-6 py-8 bg-card dark:bg-card text-foreground shadow-lg rounded-lg border border-border focus:ring-2 focus:ring-primary">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Name</h2>
        {successMessage && (
          <p className="text-success text-center mb-4">{successMessage}</p>
        )}
        <ProfileForm type="name" onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default UpdateName;
