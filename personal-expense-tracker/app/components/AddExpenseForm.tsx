// components/AddExpenseForm.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface FormData {
  amount: number;
  description: string;
  date: string;
  categoryId: number;
}

const AddExpenseForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/getAll');
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert('Error fetching categories');
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const floatAmount = parseFloat(data.amount.toString());
      const categoryId = parseInt(data.categoryId.toString(), 10);
      const response = await axios.post('/api/expenses/add', {
        ...data,
        amount: floatAmount,
        categoryId: categoryId,
      });
      if (response.status === 201) {
        alert('Expense added successfully!');
        reset(); // Reset the form fields
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      alert('Error adding expense');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted dark:bg-muted text-foreground py-6">
      <div className="max-w-sm w-full px-6 py-8 bg-card dark:bg-card text-foreground shadow-lg rounded-lg border border-border focus:ring-2 focus:ring-primary">
        <h2 className="text-3xl font-bold mb-6 text-center">Add an Expense</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">Amount</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              {...register("amount", { 
                required: "Amount is required",
                valueAsNumber: true 
              })}
            />
            {errors.amount && <p className="form-input-error">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="form-label">Description</label>
            <input
              type="text"
              maxLength={90} // Limit to 90 characters
              className="form-input"
              {...register("description", { 
                required: "Description is required",
                maxLength: {
                  value: 90,
                  message: "Description cannot exceed 90 characters"
                }
              })}
            />
            {errors.description && <p className="form-input-error">{errors.description.message}</p>}
          </div>
          <div>
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && <p className="form-input-error">{errors.date.message}</p>}
          </div>
          <div>
            <label className="form-label">Category</label>
            <select
              className="form-input"
              {...register("categoryId", { required: "Category is required" })}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="form-input-error">{errors.categoryId.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary mt-4">Add Expense</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;