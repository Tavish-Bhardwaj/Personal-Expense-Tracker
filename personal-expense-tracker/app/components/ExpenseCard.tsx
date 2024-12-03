


// "use client";

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ReactNode, useState } from "react";
// import { useRouter } from 'next/navigation'; 
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { Expense } from "@prisma/client";

// type ExpenseCardProps = {
//   expense: {
//     id: number;
//     description: string;
//     amount: number;
//     date: string;
//     category: {
//       id: number;
//       name: string; // Accessing the category name here
//     };
//   };
//   onDelete: (id: number) => void; // Callback prop for deleting an expense
// };

// type CustomButtonProps = {
//   children: ReactNode;
//   className?: string; 
//   onClick?: () => void; 
// }

// const CustomButton = ({ children, className, onClick }: CustomButtonProps) => {
//   return (
//     <button
//       className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${className}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// const ExpenseCard = ({ expense, onDelete }: ExpenseCardProps) => {
//   const router = useRouter(); // Initialize the router

//   // Handler for the Edit button click
//   const handleEditClick = () => {
//     router.push(`/expenses/${expense.id}/edit`); // Navigate to the edit page
//   };

//   const deleteExpense = async (id: number) => {
//     if (confirm("Are you sure you want to delete this expense?")) {
//       try {
//         await axios.delete(`/api/expenses/${id}/delete`);
//         onDelete(id); // Call the onDelete callback to refresh the list
//       } catch (error) {
//         console.error("Error deleting expense:", error);
//       }
//     }
//   };

//   return (
//     <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative">
//       <CardHeader className="flex-row justify-between items-start">
//         <CardTitle className="text-2xl font-semibold">{expense.description}</CardTitle>
//         <p className="text-2xl font-bold text-green-600">₹{expense.amount}</p>
//       </CardHeader>
//       <CardContent className="space-y-2">
//         <div className="flex items-center justify-between">
//           <div className="border border-purple-500 bg-purple-100 text-purple-800 rounded-md px-2 py-1 text-sm">
//             {expense.category.name}
//           </div>
//           <p className="text-sm font-medium text-muted-foreground">
//             {new Date(expense.date).toLocaleDateString()}
//           </p>
//         </div>
//       </CardContent>
//       <CardFooter className="flex-row justify-between">
//         <Button
//           variant="destructive"
//           size="sm"
//           className="py-2 px-1 text-xs shadow-sm hover:shadow-md"
//           onClick={() => deleteExpense(expense.id)}
//         >
//           Delete
//         </Button>
//         <CustomButton className="absolute bottom-4 right-4" onClick={handleEditClick}>
//           Edit Expense
//         </CustomButton>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ExpenseCard;


"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { useRouter } from 'next/navigation'; 
import { Button } from "@/components/ui/button";
import axios from "axios";

type ExpenseCardProps = {
  expense: {
    id: number;
    description: string;
    amount: number;
    date: string;
    category: {
      id: number;
      name: string; // Accessing the category name here
    };
  };
  onDelete: (id: number) => void; // Callback prop for deleting an expense
};

type CustomButtonProps = {
  children: ReactNode;
  className?: string; 
  onClick?: () => void; 
}

const CustomButton = ({ children, className, onClick }: CustomButtonProps) => {
  return (
    <button
      className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const ExpenseCard = ({ expense, onDelete }: ExpenseCardProps) => {
  const router = useRouter(); // Initialize the router

  // Handler for the Edit button click
  const handleEditClick = () => {
    router.push(`/expenses/${expense.id}/edit`); // Navigate to the edit page
  };

  const deleteExpense = async (id: number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`/api/expenses/${id}/delete`);
        onDelete(id); // Call the onDelete callback to refresh the list
      } catch (error) {
        console.error("Error deleting expense:", error);
      }
    }
  };

  return (
    <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300 p-4 relative">
      <CardHeader className="flex-row justify-between items-start">
        <CardTitle className="text-2xl font-semibold">{expense.description}</CardTitle>
        <p className="text-2xl font-bold text-green-600">₹{expense.amount}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="border border-purple-500 bg-purple-100 text-purple-800 rounded-md px-2 py-1 text-sm">
            {expense.category.name}
          </div>
          <p className="text-sm font-medium text-muted-foreground">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex-row justify-between">
        <Button
          variant="destructive"
          size="sm"
          className="py-2 px-2 text-lg border-2 border-red-600 hover:border-red-700 shadow-sm hover:shadow-md transition duration-200"
          onClick={() => deleteExpense(expense.id)}
        >
          Delete
        </Button>
        <CustomButton className="absolute bottom-4 right-4" onClick={handleEditClick}>
          Edit Expense
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;