


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ExpenseCardProps = {
  expense: {
    id: number;
    description: string;
    amount: number;
    date: string;
  };
};

// const ExpenseCard = ({ expense }: ExpenseCardProps) => {
const ExpenseCard = () => {
  return (
    <Card className="card shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        {/* <CardTitle className="text-lg font-semibold">{expense.description}</CardTitle> */}
        <CardTitle className="text-lg font-semibold">Expense on travel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-primary">Amount:</p>
          {/* <p className="text-lg font-bold text-primary-foreground">₹{expense.amount}</p> */}
          <p className="text-lg font-bold text-secondary-foreground">₹1000</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-secondary-foreground">Date:</p>
          <p className="text-sm font-medium text-muted-foreground">
            {/* {new Date(expense.date).toLocaleDateString()} */}
            {new Date(24/2/2005).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="btn btn-primary w-full" variant="default">
          Edit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
