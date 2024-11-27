// app/expenses/page.tsx
import ExpenseCard from "@/app/components/ExpenseCard";
//import ExpensesList from "../../components/ExpenseList";

const ExpensesPage = () => {
  return (
    <div className="page-container">
      <div className="max-w-4xl w-full">
        <h1 className="heading">Your Expenses</h1>
        {/* <ExpensesList /> */}
        <ExpenseCard />
      </div>
    </div>
  );
};

export default ExpensesPage;
