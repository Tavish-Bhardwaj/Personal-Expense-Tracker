


"use client";

import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="page-container min-h-screen overflow-y-auto ">
      <div className="max-w-4xl mx-auto text-center px-6">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold mb-4 mt-4">
          Welcome to <span className="text-primary">ExpenseTracker</span>
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
            <h3 className="text-xl font-semibold mb-3">Set Category wise Expenses</h3>
            <p className="text-foreground">
              Easily manage expenses and categorize them and keep a complete track of your spendings.
            </p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3">Detailed Insights</h3>
            <p className="text-foreground">
              Visualize your expenses with charts and gain actionable insights for better financial planning.
            </p>
          </div>
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
          <p className="text-sm text-muted-foreground mt-4">
            Designed and Developed with ❤️ by <span className="font-semibold">Tavish Bhardwaj</span>
          </p>
        </div>
      </div>
    </div>
  );
}
