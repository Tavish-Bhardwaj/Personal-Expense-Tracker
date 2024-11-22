// app/profile/page.tsx or pages/profile.tsx
"use client"
import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile"; 

const UserProfilePage = () => {
  const [user, setUser ] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUser (data.user); // Assuming your API returns { user: { name, email } }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or skeleton
  }

  if (error) {
    return <div>Error: {error}</div>; // Handle the error case
  }

  if (!user) {
    return <div>User not found</div>; // Handle the case where the user is not found
  }

  return (
    <div>
      <Profile name={user.name} email={user.email} />
    </div>
  );
};

export default UserProfilePage;