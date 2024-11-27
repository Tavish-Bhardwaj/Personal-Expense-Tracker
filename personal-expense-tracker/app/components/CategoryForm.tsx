"use client";

import React, { useState } from "react";
import axios from "axios";

const CategoryForm = ({ onCategoryAdded }: { onCategoryAdded: () => void }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name.trim()) {
      setError("Category name is required.");
      return;
    }

    try {
      const response = await axios.post("/api/categories/create", { name });

      if (response.status === 201) {
        setSuccess("Category added successfully!");
        setName("");
        onCategoryAdded(); // Refresh the categories list
      } else {
        setError("Failed to add category.");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "Failed to add category.");
      } else {
        setError("An error occurred while adding the category.");
      }
    }
  };

  return (
    <div className="max-w-sm w-full px-6 py-8 bg-card text-foreground shadow-lg rounded-lg border border-border">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Category</h2>
      {error && <p className="text-destructive text-center mb-4">{error}</p>}
      {success && <p className="text-success text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Category Name
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;