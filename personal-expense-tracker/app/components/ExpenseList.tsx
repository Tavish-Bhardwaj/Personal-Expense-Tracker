// // // // // // "use client";

// // // // // // import { useEffect, useState } from "react";
// // // // // // import ExpenseCard from "./ExpenseCard";
// // // // // // import axios from "axios";

// // // // // // type Expense = {
// // // // // //   id: number;
// // // // // //   description: string;
// // // // // //   amount: number;
// // // // // //   date: string;
// // // // // //   category: {
// // // // // //     id: number;
// // // // // //     name: string; 
// // // // // //   };
// // // // // // };

// // // // // // const ExpensesList = () => {
// // // // // //   const [expenses, setExpenses] = useState<Expense[]>([]);
// // // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchExpenses = async () => {
// // // // // //       try {
// // // // // //         const response = await axios.get<Expense[]>("/api/expenses");
// // // // // //         setExpenses(response.data);
// // // // // //         setError(null);
// // // // // //       } catch (err) {
// // // // // //         console.error("Failed to fetch expenses:", err);
// // // // // //         setError("Failed to load expenses. Please try again later.");
// // // // // //       } finally {
// // // // // //         setIsLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchExpenses();
// // // // // //   }, []);

// // // // // //   if (isLoading) {
// // // // // //     return (
// // // // // //       <div className="text-center text-muted dark:text-muted-foreground py-8">
// // // // // //         <p className="text-lg">Loading expenses...</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="text-center text-destructive py-8">
// // // // // //         <p className="text-lg">{error}</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   if (expenses.length === 0) {
// // // // // //     return (
// // // // // //       <div className="text-center text-muted dark:text-muted-foreground py-8">
// // // // // //         <p className="text-lg">No expenses found.</p>
// // // // // //       </div>
// // // // // //     );
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="page-container">
// // // // // //       <div className="max-w-6xl mx-auto px-4">
// // // // // //         <h1 className="heading text-primary mb-6">Your Expenses</h1>
// // // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // // //           {expenses.map((expense) => (
// // // // // //             <ExpenseCard key={expense.id} expense={expense} />
// // // // // //           ))}
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ExpensesList;



// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import ExpenseCard from "./ExpenseCard";
// // // // // import axios from "axios";

// // // // // type Expense = {
// // // // //   id: number;
// // // // //   description: string;
// // // // //   amount: number;
// // // // //   date: string;
// // // // //   category: {
// // // // //     id: number;
// // // // //     name: string; 
// // // // //   };
// // // // // };

// // // // // const ExpensesList = () => {
// // // // //   const [expenses, setExpenses] = useState<Expense[]>([]);
// // // // //   const [isLoading, setIsLoading] = useState(true);
// // // // //   const [error, setError] = useState<string | null>(null);

// // // // //   useEffect(() => {
// // // // //     const fetchExpenses = async () => {
// // // // //       try {
// // // // //         const response = await axios.get<Expense[]>("/api/expenses");
// // // // //         setExpenses(response.data);
// // // // //         setError(null);
// // // // //       } catch (err) {
// // // // //         console.error("Failed to fetch expenses:", err);
// // // // //         setError("Failed to load expenses. Please try again later.");
// // // // //       } finally {
// // // // //         setIsLoading(false);
// // // // //       }
// // // // //     };

// // // // //     fetchExpenses();
// // // // //   }, []);

// // // // //   if (isLoading) {
// // // // //     return (
// // // // //       <div className="text-center text-muted dark:text-muted-foreground py-8">
// // // // //         <p className="text-lg">Loading expenses...</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="text-center text-destructive py-8">
// // // // //         <p className="text-lg">{error}</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   if (expenses.length === 0) {
// // // // //     return (
// // // // //       <div className="text-center text-muted dark:text-muted-foreground py-8">
// // // // //         <p className="text-lg">No expenses found.</p>
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// // // // //       {expenses.map((expense) => (
// // // // //         <ExpenseCard key={expense.id} expense={expense} />
// // // // //       ))}
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default ExpensesList;

// // // // import { useEffect, useState } from "react";
// // // // import ExpenseCard from "./ExpenseCard";
// // // // import axios from "axios";

// // // // type Expense = {
// // // //   id: number;
// // // //   description: string;
// // // //   amount: number;
// // // //   date: string;
// // // //   category: {
// // // //     id: number;
// // // //     name: string; 
// // // //   };
// // // // };

// // // // const ExpensesList = () => {
// // // //   const [expenses, setExpenses] = useState<Expense[]>([]);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const [error, setError] = useState<string | null>(null);

// // // //   useEffect(() => {
// // // //     const fetchExpenses = async () => {
// // // //       try {
// // // //         const response = await axios.get<Expense[]>("/api/expenses");
// // // //         setExpenses(response.data);
// // // //         setError(null);
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch expenses:", err);
// // // //         setError("Failed to load expenses. Please try again later.");
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };

// // // //     fetchExpenses();
// // // //   }, []);

// // // //   return (
// // // //     <div>
// // // //       {isLoading ? (
// // // //         // <RotatingLines
// // // //         //   strokeColor="grey"
// // // //         //   strokeWidth="5"
// // // //         //   animationDuration="0.75"
// // // //         //   width="96"
// // // //         //   visible={true}
// // // //         // />
// // // //         <div>Loading...</div>
// // // //       ) : expenses.length === 0 ? (
// // // //         <div>No expenses found</div>
// // // //       ) : (
// // // //         <ul>
// // // //           {expenses.map((expense) => (
// // // //             <ExpenseCard key={expense.id}>{expense.description}: ${expense.amount}</li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ExpenseList;



// // // import React, { useState, useEffect } from 'react';
// // // import { RotatingLines } from 'react-loader-spinner';
// // // import ExpenseCard from './ExpenseCard';

// // // const ExpenseList = () => {
// // //   const [expenses, setExpenses] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(true);

// // //   useEffect(() => {
// // //     const fetchExpenses = async () => {
// // //       setIsLoading(true);
// // //       try {
// // //         const response = await fetch('https://api.example.com/expenses');
// // //         const result = await response.json();
// // //         setExpenses(result);
// // //       } catch (error) {
// // //         console.error('Error fetching expenses:', error);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };

// // //     fetchExpenses();
// // //   }, []);

// // //   return (
// // //     <div className="p-4">
// // //       {isLoading ? (
// // //         <RotatingLines
// // //           strokeColor="grey"
// // //           strokeWidth="5"
// // //           animationDuration="0.75"
// // //           width="96"
// // //           visible={true}
// // //         />
// // //       ) : expenses.length === 0 ? (
// // //         <div>No expenses found</div>
// // //       ) : (
// // //         <div className="grid grid-cols-1 gap-4">
// // //           {expenses.map((expense) => (
// // //             <ExpenseCard  expense={expense} />
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default ExpenseList;




// // import React, { useState, useEffect } from 'react';
// // import { RotatingLines } from 'react-loader-spinner';
// // import ExpenseCard from './ExpenseCard'; // Adjust the import path as necessary

// // const ExpenseList = () => {
// //   const [expenses, setExpenses] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchExpenses = async () => {
// //       setIsLoading(true);
// //       try {
// //         const response = await fetch('/api/expenses');
// //         console.log(response)
// //         const result = await response.json();
// //         console.log(result)

// //         setExpenses(result);
// //         console.log(expenses)
// //       } catch (error) {
// //         console.error('Error fetching expenses:', error);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchExpenses();
// //   }, []);

// //   return (
// //     <div className="p-4">
// //       {isLoading ? (
// //         <RotatingLines
// //           strokeColor="grey"
// //           strokeWidth="5"
// //           animationDuration="0.75"
// //           width="96"
// //           visible={true}
// //         />
// //       ) : expenses.length === 0 ? (
// //         <div>No expenses found</div>
// //       ) : (
// //         <div className="grid grid-cols-1 gap-4">
// //           {expenses.map((expense) => (
// //             <ExpenseCard  expense={expense} /> // Pass the expense prop here
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ExpenseList;


// import React, { useState, useEffect } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import ExpenseCard from './ExpenseCard'; // Adjust the import path as necessary

// // Define the type for an expense
// type Expense = {
//       id: number;
//       description: string;
//       amount: number;
//       date: string;
//       category: {
//         id: number;
//         name: string; 
//       };
//     };
// // Define the props for the ExpenseList component
// interface ExpenseListProps {
//   filter: string;
//   searchQuery: string;
//   selectedCategory:{
//     id:number;
//     name: string;
//   };
// }



// const ExpenseList: React.FC<ExpenseListProps> = ({ filter, searchQuery, selectedCategory }) => {
//     const [expenses, setExpenses] = useState<Expense[]>([]);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
  
//     useEffect(() => {
//       const fetchExpenses = async () => {
//         setIsLoading(true);
//         try {
//           const response = await fetch('/api/expenses');
//           const result: Expense[] = await response.json(); // Assuming the API returns an array of expenses
//           setExpenses(result);
//         } catch (error) {
//           console.error('Error fetching expenses:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       };
  
//       fetchExpenses();
//     }, []);
  
//     // Filter and sort expenses based on the filter, search query, and selected category
//     const filteredExpenses = expenses
//       .filter(expense => 
//         expense.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
//         (selectedCategory ? expense.category === selectedCategory : true) // Filter by category if selected
//       )
//       .sort((a, b) => {
//         switch (filter) {
//           case "latest":
//             return new Date(b.date).getTime() - new Date(a.date).getTime();
//           case "oldest":
//             return new Date(a.date).getTime() - new Date(b.date).getTime();
//           case "amount_high":
//             return b.amount - a.amount;
//           case "amount_low":
//             return a.amount - b.amount;
//           case "category":
//             return 0; // Default case, no sorting
//           default:
//             return 0;
//         }
//       });
  
//     return (
//       <div className="p-4">
//         {isLoading ? (
//           <RotatingLines
//             strokeColor="grey"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="96"
//             visible={true}
//           />
//         ) : filteredExpenses.length === 0 ? (
//           <div>No expenses found</div>
//         ) : (
//           <div className="grid grid-cols-1 gap-4">
//             {filteredExpenses.map((expense) => (
//               <ExpenseCard key={expense.id} expense={expense} /> // Pass the expense prop here
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default ExpenseList;


import React, { useState, useEffect } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import ExpenseCard from './ExpenseCard'; // Adjust the import path as necessary

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
        <div>No expenses found</div>
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