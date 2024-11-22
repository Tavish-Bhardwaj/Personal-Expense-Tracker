

"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

type FormInputs = {
  currentPassword?: string;
  newEmail?: string;
  newPassword?: string;
  newName?: string;
};

type ProfileFormProps = {
  type: "name" | "email" | "password";
  onSuccess: () => void;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ type, onSuccess }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>();

  const handleUpdate: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    setMessage(null);

    try {
      // API call to update the profile based on the type
      await axios.put(
        "/api/profile",
        { type, ...data },
        { withCredentials: true }
      );

      setMessage("Update successful!");
      reset();
      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setMessage(error.response.data.error || `Error updating ${type}.`);
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="mb-6">
      {type === "name" && (
        <div className="mb-4">
          <label htmlFor="newName" className="block text-sm font-medium mb-2">
            New Name
          </label>
          <input
            id="newName"
            {...register("newName", {
              required: "Name is required",
              minLength: {
                value: 1,
                message: "Name must not be empty",
              },
              pattern: {
                value: /.+\S.+/,
                message: "Name cannot consist only of spaces",
              },
            })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.newName && (
            <p className="text-destructive text-sm mt-1">
              {errors.newName.message}
            </p>
          )}
        </div>
      )}

      {type === "email" && (
        <div className="mb-4">
          <label htmlFor="newEmail" className="block text-sm font-medium mb-2">
            New Email
          </label>
          <input
            id="newEmail"
            type="email"
            {...register("newEmail", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
          />
          {errors.newEmail && (
            <p className="text-destructive text-sm mt-1">
              {errors.newEmail.message}
            </p>
          )}
        </div>
      )}

      {type === "password" && (
        <>
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium mb-2"
            >
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              {...register("currentPassword", {
                required: "Current password is required",
              })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.currentPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full px-3 py-2 rounded-lg border border-border bg-input focus:ring-2 focus:ring-primary focus:outline-none"
            />
            {errors.newPassword && (
              <p className="text-destructive text-sm mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg mt-4 shadow hover:bg-primary-foreground hover:text-primary transition ${
          loading ? "opacity-50" : ""
        }`}
      >
        {loading ? "Updating..." : `Update ${type}`}
      </button>

      {message && (
        <p
          className={`text-sm mt-2 ${
            message.includes("successful")
              ? "text-success"
              : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ProfileForm;
