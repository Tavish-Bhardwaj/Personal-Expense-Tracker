// pages/profile/update-email

"use client";

import React from "react";
import ProfileForm from "../../../components/ProfileForm";

const UpdateEmail = () => {
  const handleSuccess = () => {
    // Optionally, you can add any additional logic on success
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-muted text-foreground py-6">
      <div className="max-w-sm w-full px-6 py-8 bg-card dark:bg-card text-foreground shadow-lg rounded-lg border border-border focus:ring-2 focus:ring-primary">
        <h2 className="text-3xl font-bold mb-6 text-center">Update Email</h2>
        <ProfileForm type="email" onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default UpdateEmail;