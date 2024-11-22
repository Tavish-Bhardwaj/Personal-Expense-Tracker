"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ProfileProps = {
  name: string;
  email: string;
};

const Profile: React.FC<ProfileProps> = ({ name, email }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-muted text-foreground py-6">
      <div className="max-w-sm w-full px-6 py-8 bg-card dark:bg-card text-foreground shadow-lg rounded-lg border border-border focus:ring-2 focus:ring-primary">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Info</h2>

        {/* User Name */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Name:</h3>
            <p className="text-md">{name}</p>
          </div>
          <button
            onClick={() => router.push("/profile/updatename")}
            className="px-2 py-1 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary-foreground hover:text-primary transition"
          >
            Update
          </button>
        </div>

        {/* User Email */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">Email:</h3>
            <p className="text-md">{email}</p>
          </div>
          <button
            onClick={() => router.push("/profile/updateemail")}
            className="px-2 py-1 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary-foreground hover:text-primary transition"
          >
            Update
          </button>
        </div>

        {/* Update Password Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/profile/updatepassword")}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow hover:bg-primary-foreground hover:text-primary transition"
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;