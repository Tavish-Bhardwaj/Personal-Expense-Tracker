// // // app/expenses/page.tsx
// // import ExpenseCard from "@/app/components/ExpenseCard";
// // //import ExpensesList from "../../components/ExpenseList";

// // const ExpensesPage = () => {
// //   return (
// //     <div className="page-container">
// //       <div className="max-w-4xl w-full">
// //         <h1 className="heading">Your Expenses</h1>
// //         {/* <ExpensesList /> */}
// //         <ExpenseCard />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ExpensesPage;



// // app/expenses/page.tsx
// "use client"
// import ExpenseCard from "@/app/components/ExpenseCard";
// import { Button } from "@/components/ui/button"; // Adjust the import based on your actual path
// import { useRouter } from "next/navigation";

// const ExpensesPage = () => {
//   const router = useRouter();

//   const handleAddExpense = () => {
//     router.push('/expenses/addExpense'); // Navigate to the addExpense page
//   };

//   return (
//     <div className="page-container">
//       <div className="max-w-4xl w-full">
//         <h1 className="heading">Your Expenses</h1>
//         <Button 
//           onClick={handleAddExpense} 
//           className="mt-4 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
//         >
//           Add Expense
//         </Button>
//         <ExpenseCard />
//       </div>
//     </div>
//   );
// };

// export default ExpensesPage;


// app/expenses/page.tsx
"use client"
import ExpenseCard from "@/app/components/ExpenseCard";
import { Button } from "@/components/ui/button"; // Adjust the import based on your actual path
import { useRouter } from "next/navigation";

const ExpensesPage = () => {
  const router = useRouter();

  const handleAddExpense = () => {
    router.push('/expenses/addExpense'); // Navigate to the addExpense page
  };

  return (
    <div className="page-container">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="heading">Your Expenses</h1>
          <Button 
            onClick={handleAddExpense} 
            className="bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add Expense
          </Button>
        </div>
        <ExpenseCard />
      </div>
    </div>
  );
};

export default ExpensesPage;