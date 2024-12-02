


// // // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";

// // // type ExpenseCardProps = {
// // //   expense: {
// // //     id: number;
// // //     description: string;
// // //     amount: number;
// // //     date: string;
// // //   };
// // // };

// // // const ExpenseCard = ({ expense }: ExpenseCardProps) => {
// // //     return (
// // //     <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300">
// // //       <CardHeader>
// // //         <CardTitle className="text-lg font-semibold">{expense.description}</CardTitle>

// // //       </CardHeader>
// // //       <CardContent className="space-y-2">
// // //         <div className="flex items-center justify-between">
// // //           <p className="text-lg font-bold text-primary-foreground">₹{expense.amount}</p>
// // //           <p className="text-lg font-bold text-secondary-foreground">₹1000</p>
// // //         </div>
// // //         <div className="flex items-center justify-between">
// // //           <p className="text-base font-medium text-secondary-foreground">Date:</p>
// // //           <p className="text-sm font-medium text-muted-foreground">
// // //             {new Date(expense.date).toLocaleDateString()}
            
// // //           </p>
// // //         </div>
// // //       </CardContent>
// // //       <CardFooter>
// // //         <Button className="btn btn-primary w-full" variant="default">
// // //           Edit
// // //         </Button>
// // //       </CardFooter>
// // //     </Card>
// // //   );
// // // };

// // // export default ExpenseCard;



// // import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";

// // type ExpenseCardProps = {
// //   expense: {
// //     id: number;
// //     description: string;
// //     amount: number;
// //     date: string;
// //     category: {
// //       id: number;
// //       name: string; // Accessing the category name here
// //     };
// //   };
// // };

// // const ExpenseCard = ({ expense }: ExpenseCardProps) => {
// //   return (
// //     <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
// //       <CardHeader className="flex-row justify-between items-start">
// //         <CardTitle className="text-2xl font-semibold">{expense.description}</CardTitle>
// //         <p className="text-2xl font-bold text-green-600">₹{expense.amount}</p>
// //       </CardHeader>
// //       <CardContent className="space-y-2">
// //         <div className="flex items-center justify-between">
          
          
// //           <div className="border border-purple-500 bg-purple-100 text-purple-800 rounded-md px-2 py-1 text-sm">
// //             {expense.category.name}
// //           </div>
// //           <p className="text-sm font-medium text-muted-foreground">
// //             {new Date(expense.date).toLocaleDateString()}
// //           </p>
// //           </div>
          
// //       </CardContent>
// //       <CardFooter className="flex-row justify-end">
// //         <Button className="btn btn-primary" variant="default">
// //           Edit Expense
// //         </Button>
// //       </CardFooter>
// //     </Card>
// //   );
// // };

// // export default ExpenseCard;




// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { ReactNode } from "react";
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
// };


// type CustomButtonProps = {
//   children: ReactNode;
//   className?: string; 
//   onClick?: () => void; 
// }

// const CustomButton = ({ children, className,onClick  }:CustomButtonProps) => {
//   return (
//     <button
//       className={`bg -blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 ${className}`}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// const ExpenseCard = ({ expense }: ExpenseCardProps) => {
//   return (
//     <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300 p-4">
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
//       <CardFooter className="flex justify-end">
//         <CustomButton className="absolute bottom-4 right-4">
//           Edit Expense
//         </CustomButton>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ExpenseCard;

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter

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

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const router = useRouter(); // Initialize the router

  // Handler for the Edit button click
  const handleEditClick = () => {
    router.push(`/expenses/${expense.id}/edit`); // Navigate to the edit page
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
      <CardFooter className="flex justify-end">
        <CustomButton className="absolute bottom-4 right-4" onClick={handleEditClick}>
          Edit Expense
        </CustomButton>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;