
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Adjust this import path according to your project

interface Category {
  id: number;
  name: string;
  createdAt: string;
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/categories/getAll");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`/api/categories/delete/${id}`);
        fetchCategories(); // Refresh the categories after deletion
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="mt-8 bg-card text-foreground shadow-lg rounded-lg border border-border p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-primary">Categories</h2>
      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <div>
          <div className="grid grid-cols-5 gap-4 border-b pb-2 font-semibold text-muted-foreground">
            <span>Serial No</span>
            <span>ID</span>
            <span>Name</span>
            <span>Created At</span>
            <span>Actions</span>
          </div>
          <ul className="mt-4 space-y-2">
            {categories.map((category, index) => (
              <li
                key={String(category.id)}
                className="grid grid-cols-5 gap-4 py-2 border-b border-muted items-center"
              >
                <span className="font-medium">{index + 1}</span> {/* Serial Number */}
                <span className="font-medium">{category.id}</span>
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(category.createdAt).toLocaleString()}
                </span>
                <Button
                  variant="destructive"
                  size="sm"
                  className="py-2 px-1 text-xs shadow-sm hover:shadow-md"
                  onClick={() => deleteCategory(category.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No categories found.</p>
      )}
    </div>
  );
};

export default CategoryList;