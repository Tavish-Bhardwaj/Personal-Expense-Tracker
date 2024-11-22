// "use client";

// import { useEffect, useState } from "react";
// import ExpenseCard from "./ExpenseCard";
// import axios from "axios";

// type Expense = {
//   id: number;
//   description: string;
//   amount: number;
//   date: string;
// };

// const ExpensesList = () => {
//   const [expenses, setExpenses] = useState<Expense[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       try {
//         const response = await axios.get<Expense[]>("/api/expenses");
//         setExpenses(response.data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch expenses:", err);
//         setError("Failed to load expenses. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExpenses();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="text-center text-muted dark:text-muted-foreground py-8">
//         <p className="text-lg">Loading expenses...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-destructive py-8">
//         <p className="text-lg">{error}</p>
//       </div>
//     );
//   }

//   if (expenses.length === 0) {
//     return (
//       <div className="text-center text-muted dark:text-muted-foreground py-8">
//         <p className="text-lg">No expenses found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       <div className="max-w-6xl mx-auto px-4">
//         <h1 className="heading text-primary mb-6">Your Expenses</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {expenses.map((expense) => (
//             <ExpenseCard key={expense.id} expense={expense} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpensesList;
