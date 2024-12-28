

"use client";
import { useState, useEffect } from "react";
import ExpenseList from "@/app/components/ExpenseList"; 
import { Button } from "@/components/ui/button"; 
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

const ExpensesPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("latest"); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); 
  const [expenses, setExpenses] = useState([]); // Assuming you have a state for expenses

  const handleAddExpense = () => {
    router.push('/expenses/addExpense'); 
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    if (event.target.value !== "category") {
      setSelectedCategory(null); // Reset selected category if filter is not category
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = event.target.value ? parseInt(event.target.value) : null; // Convert to number or null
    const category = categories.find(cat => cat.id === categoryId) || null; // Find the category object or null
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories/getAll'); // Adjust the API endpoint as necessary
        const result: Category[] = await response.json();
        console.log(result); // Log the result to check the data structure
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-12 flex justify-center"> {/* Center the content */}
      <div className="max-w-4xl w-full px-4"> {/* Added padding for better spacing */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="heading text-center md:text-left">Your Expenses</h1>
          <div className="flex items-center mt-4 md:mt-0">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="mr-4 p-2 border rounded dark:bg-gray-800 text-black" // Added dark mode styles
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="amount_high">Amount: Highest First</option>
              <option value="amount_low">Amount: Lowest First</option>
              <option value="category">Category</option>
            </select>
            {filter === "category" && (
              <select
                value={selectedCategory ? selectedCategory.id : ""}
                onChange={handleCategoryChange}
                className="mr-4 p-2 border rounded dark:bg-gray-800 text-black" // Added dark mode styles
              >
                <option value="">Select Category</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option value="">No categories available</option> // Fallback option
                )}
              </select>
            )}
            <Button 
              onClick={handleAddExpense} 
              className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Add Expense
            </Button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search by description..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 border rounded mb-4 w-full"
        />
        <ExpenseList 
          filter={filter} 
          searchQuery={searchQuery} 
          selectedCategory={selectedCategory} 
        />
      </div>
    </div>
  );
};

export default ExpensesPage;