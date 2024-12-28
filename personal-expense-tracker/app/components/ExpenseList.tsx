"use client"
import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ExpenseCard from './ExpenseCard'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"; 


interface Expense {
  id: number; // or number, depending on your data structure
  description: string;
  amount: number;
  date: string; // or Date, depending on how you handle dates
  category:{
    id: number;
    name: string;
  } // Use categoryId to reference the category
}

interface Category {
  id: number;
  name: string;
}

interface ExpenseListProps {
  filter: string;
  searchQuery: string;
  selectedCategory: Category | null; // Accept null
}

const ExpenseList: React.FC<ExpenseListProps> = ({ filter, searchQuery, selectedCategory }) => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/expenses');
        const result: Expense[] = await response.json(); // Assuming the API returns an array of expenses
        setExpenses(result);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();
  }, []);


  const handleAddExpense = () => {
    router.push('/expenses/addExpense'); 
  };

  const handleDelete = (id: number) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
  };

  // Filter and sort expenses based on the filter, search query, and selected category
  const filteredExpenses = expenses
    .filter(expense => 
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? expense.category.id === selectedCategory.id : true) // Filter by category if selected
    )
    .sort((a, b) => {
      switch (filter) {
        case "latest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount_high":
          return b.amount - a.amount;
        case "amount_low":
          return a.amount - b.amount;
        case "category":
          return 0; // Default case, no sorting
        default:
          return 0;
      }
    });

  return (
    <div className="p-4">
      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : filteredExpenses.length === 0 ? (
        <div className="flex flex-col items-center">
            <p className="text-gray-600">Add new Expense</p>
            <Button 
              onClick={handleAddExpense} 
              className="mt-2 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Add Expense
            </Button>
          </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredExpenses.map((expense) => (
            <ExpenseCard key={expense.id} expense={expense} onDelete={handleDelete}/> // Pass the expense prop here
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;