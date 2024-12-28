"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons for dropdown

export default function LandingPage() {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false); // State to manage dropdown visibility

  const toggleHowToUse = () => {
    setIsHowToUseOpen(!isHowToUseOpen);
  };

  return (
    <div className="page-container min-h-screen overflow-y-auto md:overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-4 mt-4">
          Welcome to <span className="text-primary">Expense Tracker</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg text-foreground mb-8">
          Your ultimate companion to track, manage, and analyze your expenses. Stay on top of your finances effortlessly and efficiently.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Track Your Spending</h3>
            <p className="text-foreground">
              Get a detailed overview of where your money is going. Stay informed about your financial habits.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Set Category-wise Expenses</h3>
            <p className="text-foreground">
              Easily manage expenses and categorize them to keep a complete track of your spending.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Detailed Insights</h3>
            <p className="text-foreground">
              Visualize your expenses with charts and gain actionable insights for better financial planning.
            </p>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between cursor-pointer p-4 border rounded " onClick={toggleHowToUse}>
            <h4 className="text-2xl font-semibold">How to Use</h4>
            {isHowToUseOpen ? (
              <FaChevronUp className="text-primary" />
            ) : (
              <FaChevronDown className="text-primary" />
            )}
          </div>
          {isHowToUseOpen && (
            <div className="mt-2 p-4 border rounded  text-left">
              <ul className="list-disc list-inside text-lg text-foreground">
                <li><strong>Create an Account:</strong> Sign up to start tracking your expenses.</li>
                <li><strong>Log In:</strong> Access your account to manage your finances.</li>
                <li><strong>Track Your Expenditures:</strong> Record your spending across different categories.</li>
                <li><strong>Analyze Your Spending:</strong> View detailed insights and visualizations of your financial habits.</li>
                <li><strong>Get Statistical Information:</strong> Access statistics to understand your spending patterns better.</li>
                <li><strong>One-Stop Solution:</strong> Enjoy a comprehensive tool for all your expenditure tracking needs.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex gap-4">
            <Button variant="default" className="w-32" onClick={() => window.location.href = "/auth/login"}>
              Log In
            </Button>
            <Button variant="secondary" className="w-32" onClick={() => window.location.href = "/auth/register"}>
              Sign Up
            </Button>
          </div>
          <p className="text-lg text-muted-foreground mt-4">
            Designed and Developed with ❤️ by <span className="font-semibold">Tavish Bhardwaj</span>
          </p>
        </div>
      </div>
    </div>
  );
}